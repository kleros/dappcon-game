import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";


export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth";
  const token = request.cookies.get(TOKEN_COOKIE);

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
