import { type NextRequest, NextResponse } from "next/server";
import { UUID } from "crypto";
import { TOKEN_COOKIE, getUserId, NotAuthenticatedResponse } from "@/lib/auth";
import {
  checkUserExists,
  getUser,
  setUser,
  getConnections,
} from "@/lib/supabase/queries";

interface ResponseBody {
  user_id: UUID;
  username: string;
  connections: number;
  token: string;
}

export const POST = async (request: NextRequest) => {
  const { token, username } = await request.json();
  const userId = await getUserId(token);

  if (!userId) {
    return NotAuthenticatedResponse;
  }

  if (await checkUserExists(userId)) {
    const user = await getUser(userId);
    if (user.error) {
      return new NextResponse(user.error.details, { status: 500 });
    }
    if (user.data?.username !== username) {
      return new NextResponse("Invalid username, Try again with correct one!", {
        status: 403,
      });
    }
  } else {
    const user = await setUser(userId, username);
    if (user.error) {
      return new NextResponse(user.error.details, { status: 500 });
    }
  }

  const connections = (await getConnections(username)).data?.connections || 0;

  const responseBody: ResponseBody = {
    user_id: userId,
    username,
    connections,
    token,
  };

  const response = new NextResponse(JSON.stringify(responseBody));
  response.cookies.set(
    TOKEN_COOKIE,
    token,
    { maxAge: 31536000, path: "/", httpOnly: true },
  );

  return response;
};
