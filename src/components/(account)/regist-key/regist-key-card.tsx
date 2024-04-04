"use client";
import React, { useEffect, useState } from "react";
import AccountHero from "../account-hero";
import { Input } from "@/components/ui/input";
import ButtonL from "@/components/ui/custom/button-l";
import { signOut, useSession } from "next-auth/react";
import { Key, User, Lock } from "lucide-react";
import { useFormState } from "react-dom";
import { validRegistKeyAction } from "@/db/actions/regist-key";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import ErrorText from "@/components/custom/error-text";
import { useRegist } from "./hooks/use-regist";

export default function RegistKeyCard() {
  const { push } = useRouter();
  const { update } = useSession();
  const [key, setKey] = useState("");
  const [localId, setLocalId] = useState("");
  const [password, setPassword] = useState("");
  const [state, action] = useFormState(validRegistKeyAction, {});
  const { pending, email, name, errorMessage, regist } = useRegist({
    onSuccess: () => {
      push(paths.root);
    },
  });

  useEffect(() => {
    if (state.status !== "OK") return;

    regist({ key, localId, password });

    return () => {
      update();
    };
  }, [state]);

  return (
    <AccountHero
      action={action}
      title="업체 정보 등록"
      type="RegistKey"
      subTitles={[
        email!,
        `${name ?? "사용자"}님 먼저 연결할 업체 키를 입력하세요.`,
      ]}
      content={
        <>
          <Input
            icon={Key}
            name="key"
            placeholder="업체 키"
            errorMessages={state?.errors?.key}
            onChange={(e) => setKey(e.target.value)}
          />
          <Input
            icon={User}
            name="localId"
            placeholder="클라이언트 ID"
            errorMessages={state?.errors?.localId}
            onChange={(e) => setLocalId(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="클라이언트 비밀번호"
            errorMessages={state?.errors?.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorText errorMessage={errorMessage} />
        </>
      }
      bottomContent={
        <div className="flex flex-col gap-2">
          <ButtonL className="w-full" isLoading={pending}>
            등록
          </ButtonL>
          <ButtonL
            type="button"
            className="w-full"
            variant={"destructive"}
            isLoading={pending}
            onClick={() => signOut()}
          >
            로그아웃
          </ButtonL>
        </div>
      }
    />
  );
}
