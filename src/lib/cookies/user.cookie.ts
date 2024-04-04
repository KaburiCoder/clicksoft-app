"use server";
import { cookies } from "next/headers";
import { cookieKeys } from "./cookie.keys";
import { UserAttrs } from "@/db/mongodb/models/user";

export async function setUserCookie(value: UserAttrs) {
  cookies().set({
    name: cookieKeys.USER_COOKIE,
    value: JSON.stringify(value),
    httpOnly: true,
  });
}

export async function deleteUserCookie() {
  cookies().delete(cookieKeys.USER_COOKIE);
}

export async function getUserCookie(): Promise<UserAttrs | undefined> {
  const value = cookies().get(cookieKeys.USER_COOKIE)?.value;

  return value ? JSON.parse(value) : undefined;
}
