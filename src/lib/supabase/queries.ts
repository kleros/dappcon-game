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