import { NextResponse } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";

export const POST = async () => {
  const response = new NextResponse;
  response.cookies.delete(TOKEN_COOKIE);

  return response;
};
