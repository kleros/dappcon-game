import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth";
  const token = request.cookies.get("token");
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
};

export const config = {
  matcher: [
    "/",
    "/auth",
    "/question/:id*",
    "/leaderboard",
    "/leaderboard/claim",
  ],
};
