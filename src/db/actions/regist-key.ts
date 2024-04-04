"use server";
import { z } from "zod";
import { updateUserKey } from "../mongodb/services/user.service";
import { auth } from "@/auth/auth";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";
import { parseZod } from "@/lib/utils/zod.util";

const schema = z.object({
  key: z.string().min(1, { message: "업체 키는 필수 입력 값 입니다." }),
  localId: z
    .string()
    .min(1, { message: "클라이언트 ID는 필수 입력 값 입니다." }),
  password: z.string().min(1, { message: "비밀번호는 필수 입력 값 입니다." }),
});

export interface RegistKeyResult {
  status?: "OK";
  errors?: {
    key?: string[] | undefined;
    localId?: string[] | undefined;
    password?: string[] | undefined;
    _form?: string[];
  };
}

export async function validRegistKeyAction(
  state: RegistKeyResult,
  formData: FormData,
): Promise<RegistKeyResult> {
  const result = parseZod(schema, formData);
  if (result.error) return result.error;

  const session = await auth();
  const user = session?.user;
  if (!user) {
    return { errors: { _form: ["로그인 정보가 없습니다."] } };
  }

  return { status: "OK" };
}

export async function registKey({
  email,
  key,
  localId,
  name,
}: {
  email: string;
  key: string;
  localId: string;
  name: string;
}) {
  const session = await auth();
  const user = session!.user!;
  const provider = (user as any)?.provider;

  await updateUserKey({
    filter: { email, provider },
    data: { key, localId, name },
  });

  revalidatePath(paths.root);

  return { status: "success" };
}
