import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const { data, error } = await getLeaderboard();
  if (error) {
    return new NextResponse("No data found", { status: 404 });
  }
  return new NextResponse(JSON.stringify(data));
};
