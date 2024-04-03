"use server";

import { z } from "zod";
import connectDB from "../mongodb/mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import { getUser, saveUser } from "../mongodb/services/user.service";
import { hash } from "bcrypt";

interface SignupResult {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    key?: string[];
    userId?: string[];
    form?: string[];
  };
}

const shcema = z.object({
  email: z
    .string()
    .email({ message: "이메일 형식이 맞지 않습니다." })
    .toLowerCase(),
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }),
  confirmPassword: z
    .string()
    .min(1, { message: "비밀번호 재확인을 입력하세요." }),
  // key: z.string().min(1, { message: "업체 고유 키를 입력하세요." }),
  // userId: z
  //   .string()
  //   .min(1, { message: "클라이언트 유저 아이디를 입력하세요." }),
});

export async function signUpAction(
  state: SignupResult,
  formData: FormData,
): Promise<SignupResult> {
  const provider = "credentials";
  const result = shcema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await connectDB();
  const { email, password, confirmPassword } = result.data;

  if (password !== confirmPassword) {
    return { errors: { confirmPassword: ["비밀번호가 일치하지 않습니다."] } };
  }

  const user = await getUser({ provider, email });
  if (!user) {
    const hashedPassword = await hash(password, 10);
    await saveUser({
      provider,
      email,
      hashedPassword,
    });
  } else {
    return { errors: { form: ["이미 존재하는 계정입니다."] } };
  }

  revalidatePath(paths.login);
  redirect(paths.login);
}
