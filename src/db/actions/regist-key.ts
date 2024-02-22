"use server";
import { z } from "zod";
import { updateUserKey } from "../mongodb/services/user.service";
import { auth } from "@/auth/auth";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";

const schema = z.object({
  key: z.string().min(1, { message: "업체 키는 필수 입력 값 입니다." }),
  localId: z
    .string()
    .min(1, { message: "클라이언트 ID는 필수 입력 값 입니다." }),
});

interface RegistKeyResult {
  data?: { key: string; localId: string };
  errors?: {
    key?: string[];
    localId?: string[];
    _form?: string[];
  };
}

export async function registKeyAction(
  state: RegistKeyResult,
  formData: FormData,
): Promise<RegistKeyResult> {
  const result = schema.safeParse(Object.fromEntries(formData));
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return { errors: { _form: ["로그인 정보가 없습니다."] } };
  }
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const email = user.email!;
  const provider = (user as any)?.provider;
  const userKeys = result.data;
  await updateUserKey({ filter: { email, provider }, data: userKeys });

  revalidatePath(paths.root);

  return {
    data: userKeys,
  };
}
