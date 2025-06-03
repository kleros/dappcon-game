import { type NextRequest, NextResponse } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";

export const POST = async (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/rules", request.nextUrl));
  response.cookies.delete(TOKEN_COOKIE);

  return response;
};
