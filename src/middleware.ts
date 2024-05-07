import { NextResponse, type NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UUID } from "crypto";

const JWT_SECRET_KEY = process.env.SECRET_KEY ?? "";

export const USER_ID_HEADER = "x-user-id-dappcon";
export const TOKEN_COOKIE = "token";

export const getUserId: (arg0: string) => UUID | false = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    return payload.user_id;
  } catch {
    return false;
  }
}

export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth";
  const isAPIPath = path.startsWith("/api/");
  const token = request.cookies.get(TOKEN_COOKIE);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isAPIPath && token) {
    const userId = getUserId(token.value);
    if (!userId) {
      return new NextResponse("User is not authenticated!", { status: 403 });
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(USER_ID_HEADER, userId);
    return NextResponse.next({ request: { headers: requestHeaders }});
  }

  if (!isPublicPath && !token && !path.startsWith("/api/auth")) {
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
    "/api/(.+)",
  ],
};
