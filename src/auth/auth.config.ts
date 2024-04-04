import { paths } from "@/paths";
import type { NextAuthConfig } from "next-auth";
import { isPathnameMatching } from "./is-pathname-matching";
import { deleteUserCookie, getUserCookie } from "@/lib/cookies/user.cookie";
import {
  FetchUserArgs,
  fetchGetUser,
  fetchSaveUser,
} from "@/app/api/auth-user/fetch";
import { authorized } from "./callbacks/authorized";

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  events: {
    signOut: () => {
      deleteUserCookie();
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      await deleteUserCookie();

      const args: FetchUserArgs = {
        provider: account?.provider!,
        email: user.email!,
      };

      const mUser = await fetchGetUser(args);
      if (!mUser) {
        await fetchSaveUser(args);
      }

      return true;
    },
    authorized,
    async session({ session, token, user }) {
      const userCookie = await getUserCookie();
      if (session?.user) {
        if (token) {
          session.user.id = token.sub!;
        }

        const sessionObj = session.user as any;
        sessionObj.provider = token.provider;
        sessionObj.name = userCookie?.name;
        sessionObj.user = userCookie;
      }
      return session;
    },
    jwt({ token, trigger, account }) {
      switch (trigger) {
        case "signIn":
          token.provider = account?.provider;
          break;
      }
      // if (trigger === "update" && session?.email) {
      //   // Note, that `session` can be any arbitrary object, remember to validate it!
      //   token.email = session.email;
      //   token.provider = account?.provider;
      // }
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
