import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserStats } from "@/lib/supabase/queries";

export const GET = async (request: Request) => {
  const token = request.headers.get("Cookie")?.replace("token=", "");
  let user_id: string | null = null;

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
  const { data, error } = await getUserStats(user_id!);
  if (error) {
    return new Response(String(error), { status: 404 });
  }
  if (data) {
    return new Response(JSON.stringify(data[0]));
  }
  return new Response("Data not found", { status: 404 });
};
