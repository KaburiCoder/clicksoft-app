import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import { credentialsProvider } from "./proivders/credentials";

export const authOptions = {
  ...authConfig,
  providers: [
    credentialsProvider,
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 2, // 2일
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authOptions);
