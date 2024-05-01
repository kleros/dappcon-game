import jwt, { JwtPayload } from "jsonwebtoken";
import { decrypt } from "@/lib/crypto";
import {
  addAnswer,
  checkAlreadyAnswered,
  updateConnectionCount,
} from "@/lib/supabase/queries";

const ONE_MINUTE_THIRTY_SECONDS = 1.5 * 60 * 1000; // Giving 30 seconds extra to answer

const verifyToken = (token: string): JwtPayload | undefined => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return undefined;
  }
};

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

export const POST = async (request: Request) => {
  const { id, question_id, choice } = await request.json();

  const token = request.headers.get("Cookie")?.replace("token=", "");

  const tokenPayload = verifyToken(token as string);
  if (!tokenPayload) {
    return new Response("User is not authenticated!", { status: 401 });
  }

  const decryptedData = await decryptData(id!);
  if (!decryptedData) {
    return new Response("Invalid player QR, re-scan new QR", { status: 400 });
  }

  const currentTime = new Date().getTime();
  const tokenTime = parseInt(decryptedData.timestamp);

  if (
    isNaN(tokenTime) ||
    currentTime > tokenTime ||
    currentTime - tokenTime > ONE_MINUTE_THIRTY_SECONDS
  ) {
    return new Response("Question expired, re-scan new QR", { status: 408 });
  }

  const isAlreadyAnswered = await checkAlreadyAnswered(
    question_id,
    tokenPayload.user_id!
  );
  if (isAlreadyAnswered) {
    return new Response("Already answered", { status: 400 });
  }

  const { error: addAnswerError } = await addAnswer(
    question_id,
    tokenPayload.user_id!,
    choice
  );
  if (addAnswerError) {
    return new Response("Failed to save your response", { status: 500 });
  }

  const { error: connectionError } = await updateConnectionCount(
    tokenPayload.user_id!
  );
  if (connectionError) {
    return new Response("Failed to update your connection", { status: 500 });
  }

  return new Response("Connected successfully");
};
