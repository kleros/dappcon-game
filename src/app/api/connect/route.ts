import { type NextRequest, NextResponse } from "next/server";
import { getUserId, TOKEN_COOKIE, NotAuthenticatedResponse } from "@/lib/auth";
import { decrypt } from "@/lib/crypto";
import {
  addAnswer,
  checkAlreadyAnswered,
  updateConnectionCount,
} from "@/lib/supabase/queries";
import { isGameEnded, QUESTION_TIMEOUT_WINDOW } from "@/lib/game.config";

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
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const userId = await getUserId(token);

  if (!userId) {
    return NotAuthenticatedResponse;
  }

  if (isGameEnded()) {
    return new NextResponse("Game has ended", { status: 400 });
  }

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
    currentTime - tokenTime > QUESTION_TIMEOUT_WINDOW
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
