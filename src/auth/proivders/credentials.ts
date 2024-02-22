import { getUser } from "@/db/mongodb/services/user.service";
import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const credentialsProvider = Credentials({
  async authorize(credentials) {
    const parsedCredentials = z
      .object({ email: z.string(), password: z.string() })
      .safeParse(credentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;

      const user = await getUser({ provider: "credentials", email });
      if (!user) return null;
      const loginSuccess = await compare(password, user.password);

      if (!loginSuccess) return null;
      return {
        id: user._id.toString(),
        email: user.email,
      };
    }

    return null;
  },
});
