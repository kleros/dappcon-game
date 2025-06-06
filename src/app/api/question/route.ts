import { type NextRequest, NextResponse } from "next/server";
import { getUserId, TOKEN_COOKIE, NotAuthenticatedResponse } from "@/lib/auth";
import { decrypt } from "@/lib/crypto";
import { checkAlreadyAnswered, getQuestion } from "@/lib/supabase/queries";
import { isGameEnded, QR_CODE_EXPIRY } from "@/lib/game.config";

const decryptData = async (
  id: string
): Promise<{ userid: string; timestamp: string } | undefined> => {
  try {
    return JSON.parse(await decrypt(id));
  } catch (error) {
    console.error("Token decryption failed:", error);
    return undefined;
  }
};

export const GET = async (request: NextRequest) => {
  const id = new URL(request.url).searchParams.get("id");
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const userId = getUserId(token);

  if (!userId) {
    return NotAuthenticatedResponse;
  }

  if (isGameEnded()) {
    return new NextResponse("Game has ended", { status: 409 });
  }

  const decryptedData = await decryptData(id!);
  if (!decryptedData) {
    return new NextResponse("Invalid player QR, re-scan new QR", {
      status: 409,
    });
  }

  if (decryptedData.userid === userId) {
    return new NextResponse("Oops, You can't connect with yourself", {
      status: 409,
    });
  }

  const currentTime = new Date().getTime();
  const tokenTime = parseInt(decryptedData.timestamp);

  if (
    isNaN(tokenTime) ||
    currentTime < tokenTime ||
    currentTime - tokenTime > QR_CODE_EXPIRY
  ) {
    return new NextResponse("QR expired, re-scan new QR", { status: 408 });
  }

  const { data, error } = await getQuestion(decryptedData.userid);
  if (error) {
    console.error("Error fetching question:", error);
    return new NextResponse("Error occurred while fetching question", {
      status: 500,
    });
  }

  if (data && data.length > 0) {
    const question = {
      ...data[0],
      timestamp: decryptedData.timestamp,
    };

    const isAlreadyAnswered = await checkAlreadyAnswered(question.id, userId);
    if (isAlreadyAnswered) {
      return new NextResponse("You're already connected!", { status: 409 });
    }

    return new NextResponse(JSON.stringify(question), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new NextResponse("Question not found", { status: 404 });
  }
};
