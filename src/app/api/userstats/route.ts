import { type NextRequest, NextResponse } from "next/server";
import { UUID } from "crypto";
import { USER_ID_HEADER } from "@/middleware";
import { getUserStats } from "@/lib/supabase/queries";

export const GET = async (request: NextRequest) => {
  const userId = request.headers.get(USER_ID_HEADER) as UUID;
  const { data, error } = await getUserStats(userId);
  if (error) {
    return new NextResponse(String(error), { status: 404 });
  }
  if (data) {
    return new NextResponse(JSON.stringify(data[0]));
  }
  return new NextResponse("Data not found", { status: 404 });
};
