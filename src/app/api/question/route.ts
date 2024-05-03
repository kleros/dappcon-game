import jwt, { JwtPayload } from "jsonwebtoken";
import { decrypt } from "@/lib/crypto";
import { getQuestion } from "@/lib/supabase/queries";

const ONE_MINUTE = 1 * 60 * 1000;

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

export const GET = async (request: Request) => {
  const id = new URL(request.url).searchParams.get("id");
  const token = request.headers.get("Cookie")?.replace("token=", "");

  const tokenPayload = verifyToken(token as string);
  if (!tokenPayload) {
    return new Response("User is not authenticated!", { status: 401 });
  }

  const decryptedData = await decryptData(id!);
  if (!decryptedData) {
    return new Response("Invalid player QR, re-scan new QR", { status: 400 });
  }

  if (decryptedData.userid === tokenPayload.user_id) {
    return new Response("Oops, You can't connect with yourself", {
      status: 400,
    });
  }

  const currentTime = new Date().getTime();
  const tokenTime = parseInt(decryptedData.timestamp);

  if (
    isNaN(tokenTime) ||
    currentTime > tokenTime ||
    currentTime - tokenTime > ONE_MINUTE
  ) {
    return new Response("QR expired, re-scan new QR", { status: 408 });
  }

  const { data, error } = await getQuestion(decryptedData.userid);
  if (error) {
    console.error("Error fetching question:", error);
    return new Response("Error occurred while fetching question", {
      status: 500,
    });
  }

  if (data && data.length > 0) {
    const question = {
      ...data[0],
      timestamp: decryptedData.timestamp,
    };
    return new Response(JSON.stringify(question), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response("Question not found", { status: 404 });
  }
};