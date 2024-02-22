"use client";
import React, { useEffect } from "react";
import AccountHero from "../account-hero";
import { Input } from "@/components/ui/input";
import ButtonL from "@/components/ui/custom/button-l";
import { signOut, useSession } from "next-auth/react";
import { Key, User } from "lucide-react";
import { useFormState } from "react-dom";
import { registKeyAction } from "@/db/actions/regist-key";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";

export default function RegistKeyCard() {
  const { push } = useRouter();
  const { data: session, update } = useSession();
  const [state, action] = useFormState(registKeyAction, {});
  const { email, name } = session?.user || {};

  useEffect(() => {
    if (!state.data) return;

    push(paths.root);
    update();
    // setUserCookie(state.data).then(() => {
    //   update();
    // });
  }, [state, push, update]);

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
          <Input icon={Key} name="key" placeholder="업체 키" />
          <Input icon={User} name="localId" placeholder="클라이언트 ID" />
        </>
      }
      bottomContent={
        <div className="flex flex-col gap-2">
          <ButtonL className="w-full">등록</ButtonL>
          <ButtonL
            type="button"
            className="w-full"
            variant={"destructive"}
            onClick={() => signOut()}
          >
            로그아웃
          </ButtonL>
        </div>
      }
    />
  );
}
