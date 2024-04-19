import { getLeaderboard } from "@/lib/supabase/queries";

export const GET = async () => {
  const { data, error } = await getLeaderboard();
  if (error) {
    return new Response("No data found", { status: 404 });
  }
  return new Response(JSON.stringify(data));
};
