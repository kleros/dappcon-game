import { type NextRequest, NextResponse } from "next/server";
import { UUID } from "crypto";
import { USER_ID_HEADER } from "@/middleware";
import { decrypt } from "@/lib/crypto";
import {
  addAnswer,
  checkAlreadyAnswered,
  updateConnectionCount,
} from "@/lib/supabase/queries";

const ONE_MINUTE_THIRTY_SECONDS = 1.5 * 60 * 1000; // Giving 30 seconds extra to answer

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

export const POST = async (request: NextRequest) => {
  const { id, question_id, choice } = await request.json();
  const userId = request.headers.get(USER_ID_HEADER) as UUID;

  const decryptedData = await decryptData(id!);
  if (!decryptedData) {
    return new NextResponse("Invalid player QR, re-scan new QR", { status: 400 });
  }

  if (decryptedData.userid === userId) {
    return new NextResponse("Oops, you cannot connect with yourself.", {
      status: 400,
    });
  }

  const currentTime = new Date().getTime();
  const tokenTime = parseInt(decryptedData.timestamp);

  if (
    isNaN(tokenTime) ||
    currentTime < tokenTime ||
    currentTime - tokenTime > ONE_MINUTE_THIRTY_SECONDS
  ) {
    return new Response("Question expired, re-scan new QR", { status: 408 });
  }

  const isAlreadyAnswered = await checkAlreadyAnswered(question_id, userId);
  if (isAlreadyAnswered) {
    return new NextResponse("Already answered", { status: 400 });
  }

  const { error: addAnswerError } = await addAnswer(question_id, userId, choice);
  if (addAnswerError) {
    return new NextResponse("Failed to save your response", { status: 500 });
  }

  const { error: connectionError } = await updateConnectionCount(userId);
  if (connectionError) {
    return new NextResponse("Failed to update your connection", { status: 500 });
  }

  return new NextResponse("Connected successfully");
};
