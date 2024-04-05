"use server";
import { signIn } from "@/auth/auth";
import { parseZod } from "@/lib/utils/zod.util";
import { AuthError } from "next-auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 잘못되었습니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }),
});

interface SigninResult {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function signInAction(
  _: any,
  formData: FormData,
): Promise<SigninResult> {
  const response = parseZod(schema, formData);
  if (response.error) return response.error;

  try {
    await signIn("credentials", {
      email: response.data.email,
      password: response.data.password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: { _form: ["아이디 혹은 비밀번호가 잘못되었습니다."] },
          };
        // case "CallbackRouteError":
        //   return error.cause?.err?.message;
        // default:
        //   return "Something went wrong.";
      }
    }
    throw error;
  }
  return {};
}
