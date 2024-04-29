import jwt, { JwtPayload } from "jsonwebtoken";
import { decrypt } from "@/lib/crypto";
import { addAnswer } from "@/lib/supabase/queries";

export const POST = async (request: Request) => {
  const { id, question_id, choice } = await request.json();

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

  //TODO:
  // 1. decrypt id and get time
  //if time is not vaid, timeout

  //check if already answered (already connected)


  const { error } = await addAnswer(question_id, user_id!, choice);
  if (error) {
    return new Response("Error occured", { status: 404 });
  }

    // connection ++

  return new Response("Connected Successfully");
};
