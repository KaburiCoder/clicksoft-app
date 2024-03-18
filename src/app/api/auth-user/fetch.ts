import { IUser, User } from "@/db/mongodb/models/user";

export interface FetchUserArgs {
  provider: string;
  email: string;
}

export async function fetchGetUser({ provider, email }: FetchUserArgs) {
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_DOMAIN}/api/auth-user?provider=${provider}&email=${email}`,
  );
  const user = await response.json();

  return user as IUser;
}

export async function fetchSaveUser(args: FetchUserArgs) {
  const response = await fetch(`http://${process.env.NEXT_PUBLIC_DOMAIN}/api/auth-user`, {
    method: "POST",
    body: JSON.stringify(args),
  });
  const mUser = await response.json();

  return mUser as IUser;
}
