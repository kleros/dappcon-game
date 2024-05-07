import { type NextRequest, NextResponse } from "next/server";
import { getUserId, TOKEN_COOKIE } from "@/middleware";
import { getUserStats } from "@/lib/supabase/queries";

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const userId = getUserId(token);
  if (userId) {
    const { data, error } = await getUserStats(userId);
    if (error) {
      return new NextResponse(String(error), { status: 404 });
    }
    if (data) {
      return new NextResponse(JSON.stringify(data[0]));
    }
  }
  return new NextResponse("Data not found", { status: 404 });
};
