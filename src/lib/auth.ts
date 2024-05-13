import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UUID } from "crypto";

const JWT_SECRET_KEY = process.env.SECRET_KEY ?? "";
export const TOKEN_COOKIE = "token";

export const getUserId: (arg0?: string) => UUID | false = (token) => {
  if (typeof(token) === "undefined") return false;
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    return payload.user_id;
  } catch {
    return false;
  }
}

export const NotAuthenticatedResponse = new NextResponse(
  "User is not authenticated!",
  { status: 403 }
);
