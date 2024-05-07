import { type NextRequest, NextResponse } from "next/server";
import { UUID } from "crypto";
import { isAddress } from "viem";
import { USER_ID_HEADER } from "@/middleware";
import { checkUserExists, claimRewards } from "@/lib/supabase/queries";

export const POST = async (request: NextRequest) => {
  const { address } = await request.json();
  const userId = request.headers.get(USER_ID_HEADER) as UUID;

  if (!isAddress(address.toLowerCase())) {
    return new NextResponse("Invalid address", { status: 500 });
  }

  if (await checkUserExists(userId)) {
    const user = await claimRewards(userId, address.toLowerCase());
    if (user.error) {
      return new NextResponse(user.error.details, { status: 500 });
    }
    return new NextResponse("Rewards claimed successfully!", { status: 200 });
  }

  return new NextResponse("Account doesn't exist", { status: 500 });
};
