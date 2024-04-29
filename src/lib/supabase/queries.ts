import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { UUID } from "crypto";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const setUser = async (user_id: UUID, username: string) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ user_id, username }]);
  return { data, error };
};

export const getUser = async (user_id: UUID) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("user_id", user_id)
    .single();
  return { data, error };
};

export const checkUserExists = async (user_id: UUID) => {
  const { data } = await getUser(user_id);
  if (data) {
    return true;
  } else {
    return false;
  }
};

export const getConnections = async (username: string) => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("connections")
    .eq("username", username)
    .single();
  return { data, error };
};

export const getLeaderboard = async () => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select()
    .order("points", { ascending: false })
    .limit(10);
  return { data, error };
};

export const getUserStats = async (user_id: string) => {
  const { data, error } = await supabase.rpc("get_user_stats", {
    user_id_params: user_id,
  });

  return { data, error };
};

export const claimRewards = async (user_id: string, address: string) => {
  const { data, error } = await supabase
    .from("users")
    .update({ address })
    .eq("user_id", user_id);
  return { data, error };
};

export const getQuestion = async (user_id: string) => {
  const { data, error } = await supabase
    .from("questions")
    .select()
    .eq("player_id", user_id);
  return { data, error };
};

export const addAnswer = async (
  question_id: string,
  player_id: string,
  choice: number
) => {
  const { data, error } = await supabase
    .from("answers")
    .insert([{ question_id, player_id, choice }]);
  return { data, error };
};
