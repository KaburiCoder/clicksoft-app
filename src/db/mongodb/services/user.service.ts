"use server";
import { UserAttrs, User } from "../models/user";
import { GetUserKeyArgs, SaveUserArgs, UpdateUserKeyArgs } from "./user.args";
import connectDB from "../mongodb";

export async function saveUser({
  provider,
  email,
  hashedPassword,
}: SaveUserArgs) {
  await connectDB();

  const user = new User({
    provider,
    email,
    password: hashedPassword,
  });

  return await user.save();
}

export async function updateUserKey({ filter, data }: UpdateUserKeyArgs) {
  await connectDB();

  const user = await getUser(filter);
  await user?.updateOne({
    ...data,
  });
}

export async function getUser({ provider, email }: GetUserKeyArgs) {
  await connectDB();

  const user = await User.findOne({ provider, email });
  return user;
}

export async function getUserOnlyType(
  args: GetUserKeyArgs,
): Promise<UserAttrs> {
  const user = await getUser(args);
  return {
    key: user?.key,
    provider: user?.provider,
  } as UserAttrs;
}
