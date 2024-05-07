import { type NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UUID } from "crypto";
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
  let user_id: UUID | null = null;
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    user_id = payload.user_id;
  } catch (error) {
    return new NextResponse("Invalid token, Scan the QR correctly", {
      status: 403,
    });
  }

  if (await checkUserExists(user_id!)) {
    const user = await getUser(user_id!);
    if (user.error) {
      return new NextResponse(user.error.details, { status: 500 });
    }
    if (user.data?.username !== username) {
      return new NextResponse("Invalid username, Try again with correct one!", {
        status: 403,
      });
    }
  } else {
    const user = await setUser(user_id!, username);
    if (user.error) {
      return new NextResponse(user.error.details, { status: 500 });
    }
  }

  const connections = (await getConnections(username)).data?.connections || 0;

  const responseBody: ResponseBody = {
    user_id: user_id!,
    username,
    connections,
    token,
  };

  const response = new NextResponse(JSON.stringify(responseBody));
  response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/`);

  return response;
};
