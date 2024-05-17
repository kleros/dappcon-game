import { type NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
import { checkUserExists, claimRewards } from "@/lib/supabase/queries";
import { getUserId, NotAuthenticatedResponse, TOKEN_COOKIE } from "@/lib/auth";
import { isGameEnded } from "@/lib/game.config";

export const POST = async (request: NextRequest) => {
  const { address } = await request.json();
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const userId = getUserId(token);

  if (!userId) {
    return NotAuthenticatedResponse;
  }

  if (!isGameEnded()) {
    return new NextResponse("Game is not ended yet", { status: 400 });
  }

  if (!isAddress(address.toLowerCase())) {
    return new NextResponse("Invalid address", { status: 500 });
  }

  if (userId && await checkUserExists(userId)) {
    const user = await claimRewards(userId, address.toLowerCase());
    if (user.error) {
      return new NextResponse(user.error.details, { status: 500 });
    }
    return new NextResponse("Rewards claimed successfully!", { status: 200 });
  }

  return new NextResponse("Account doesn't exist", { status: 500 });
};
