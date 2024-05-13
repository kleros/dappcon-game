import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UUID } from "crypto";
import { checkUserExists } from "@/lib/supabase/queries";

const JWT_SECRET_KEY = process.env.SECRET_KEY ?? "";
export const TOKEN_COOKIE = "token";

export const getUserId: (arg0?: string) => Promise<UUID | false> = async (token) => {
  if (typeof(token) === "undefined") return false;
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    const userId = payload.user_id;
    const userExists = await checkUserExists(userId);
    if (!userExists) {
      throw new Error("User not registered yet.")
    }
    return userId;
  } catch {
    return false;
  }
}

export const NotAuthenticatedResponse = new NextResponse(
  "User is not authenticated!",
  { status: 403 }
);
