"use client";
import { IUser } from "@/db/mongodb/models/user";
import { useSession } from "next-auth/react";

export const useSessionEx = () => {
  const { data, status, update } = useSession();

  const sessionUser = data?.user;
  const user = (sessionUser as any)?.user as IUser;
  return {
    sessionUser,
    user,
    status,
    update,
  };
};
