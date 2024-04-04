"use server";
import { signIn } from "@/auth/auth";
import { AuthError } from "next-auth";

export async function signInAction(_: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    await signIn("credentials", { email, password });
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
  // revalidatePath(paths.root);
}
