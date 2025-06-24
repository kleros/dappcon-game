import { NextResponse } from "next/server";
import {
  getLeaderboard,
  getLeaderboardConcluded,
  getTotalConnectionCount,
} from "@/lib/supabase/queries";
import { isGameConcluded, TOTAL_PNK } from "@/lib/game.config";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const { data: leaderboard, error: leaderboardError } = isGameConcluded()
    ? await getLeaderboardConcluded()
    : await getLeaderboard();
  const { data: totalConnectionCount, error: totalConnectionCountError } =
    await getTotalConnectionCount();

  if (leaderboardError || totalConnectionCountError) {
    const errorMessage = leaderboardError || totalConnectionCountError;
    return new NextResponse(String(errorMessage), { status: 500 });
  }

  if (leaderboard && totalConnectionCount) {
    if (!isGameConcluded()) {
      // Total_PNK * Player's_Connections * 0.7 / Total_Connections
      leaderboard.forEach((item) => {
        item.token = Math.floor(
          (TOTAL_PNK * item.connections * 0.7) /
            totalConnectionCount[0].total_count
        );
      });
    }
    return new NextResponse(JSON.stringify(leaderboard));
  }

  return new NextResponse("No Data Found", { status: 404 });
};
