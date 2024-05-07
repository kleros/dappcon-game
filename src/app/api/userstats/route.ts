import { type NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserStats } from "@/lib/supabase/queries";

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("token");
  let user_id: string | null = null;

  try {
    const payload = jwt.verify(
      token?.value!,
      process.env.SECRET_KEY!
    ) as JwtPayload;
    user_id = payload.user_id;
  } catch (error) {
    return new NextResponse("User is not authenticated!", {
      status: 403,
    });
  }
  const { data, error } = await getUserStats(user_id!);
  if (error) {
    return new NextResponse(String(error), { status: 404 });
  }
  if (data) {
    return new NextResponse(JSON.stringify(data[0]));
  }
  return new NextResponse("Data not found", { status: 404 });
};
