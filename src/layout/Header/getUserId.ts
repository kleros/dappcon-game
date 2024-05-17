"use server"

import { cookies } from "next/headers";
import { getUserId as _getUserId, TOKEN_COOKIE } from "@/lib/auth";
import { isUndefined } from "@/lib/utils";

export const getUserId = async () => {
  const token = cookies().get(TOKEN_COOKIE)?.value;
  if (isUndefined(token)) {
    return false
  } else {
    return _getUserId(token);
  }
}
