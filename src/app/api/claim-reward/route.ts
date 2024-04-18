import { type NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UUID } from "crypto";
import { isAddress } from "viem";
import { checkUserExists, claimRewards } from "@/lib/supabase/queries";

export const POST = async (request: NextRequest) => {
  const { address } = await request.json();
  const token = request.headers.get("Cookie")?.replace("token=", "");
  let user_id: UUID | null = null;

  try {
    const payload = jwt.verify(
      token as string,
      process.env.SECRET_KEY!
    ) as JwtPayload;
    user_id = payload.user_id;
  } catch (error) {
    return new Response("User is not authenticated!", {
      status: 403,
    });
  }

  if (!isAddress(address.toLowerCase())) {
    return new Response("Invalid address", { status: 500 });
  }

  if (await checkUserExists(user_id!)) {
    const user = await claimRewards(user_id!, address.toLowerCase());
    if (user.error) {
      return new Response(user.error.details, { status: 500 });
    }
    return new Response("Rewards claimed successfully!", { status: 200 });
  }

  return new Response("Account doesn't exist", { status: 500 });
};
