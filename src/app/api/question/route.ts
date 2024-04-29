import jwt, { JwtPayload } from "jsonwebtoken";
import { decrypt } from "@/lib/crypto";
import { getQuestion } from "@/lib/supabase/queries";

export const GET = async (request: Request) => {
  const id = new URL(request.url).searchParams.get("id");

  const token = request.headers.get("Cookie")?.replace("token=", "");

  try {
    const payload = jwt.verify(
      token as string,
      process.env.SECRET_KEY!
    ) as JwtPayload;
  } catch (error) {
    return new Response("User is not authenticated!", {
      status: 403,
    });
  }

  //TODO:
  // 1. decrypt id get userid , time
  //if time is vaid , fetch question, else timeout

  const { data, error } = await getQuestion(id!);
  if (error) {
    return new Response("Error occured", { status: 404 });
  }
  if (data) {
    return new Response(JSON.stringify(data[0]));
  }

  return new Response("Data not found", { status: 404 });
};
