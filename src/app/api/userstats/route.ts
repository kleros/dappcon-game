import { type NextRequest, NextResponse } from "next/server";
import { getUserId, TOKEN_COOKIE, NotAuthenticatedResponse } from "@/lib/auth";
import { getUserStats, getTotalConnectionCount } from "@/lib/supabase/queries";
import { isGameConcluded, TOTAL_PNK } from "@/lib/game.config";

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const userId = getUserId(token);

  if (!userId) {
    return NotAuthenticatedResponse;
  }

  const { data: userStats, error: userStatsError } = await getUserStats(userId);
  const { data: totalConnectionCount, error: totalConnectionCountError } =
    await getTotalConnectionCount();

  if (userStatsError || totalConnectionCountError) {
    const errorMessage = userStatsError || totalConnectionCountError;
    return new NextResponse(String(errorMessage), { status: 500 });
  }

  if (userStats && totalConnectionCount) {
    if (!isGameConcluded()) {
      // Total_PNK * Player's_Connections * 0.7 / Total_Connections
      userStats[0].token = Math.floor(
        (TOTAL_PNK * userStats[0].connections * 0.7) /
          totalConnectionCount[0].total_count
      );
    }
    return new NextResponse(JSON.stringify(userStats[0]));
  }

  return new NextResponse("Data not found", { status: 404 });
};
