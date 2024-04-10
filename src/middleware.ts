import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/welcome";
  const token = request.cookies.get("token");
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/welcome", request.nextUrl));
  }
};

export const config = {
  matcher: [
    "/",
    "/welcome",
    "/question/:id*",
    "/leaderboard",
    "/leaderboard/claim",
  ],
};
