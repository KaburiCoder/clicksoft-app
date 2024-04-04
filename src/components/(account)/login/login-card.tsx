"use client";
import AccountHero from "@/components/(account)/account-hero";
import ButtonL from "@/components/ui/custom/button-l";
import { Input } from "@/components/ui/input";
import React from "react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { useFormState } from "react-dom";
import { signInAction } from "@/db/actions/sign-in";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function LoginCard() {
  const [_, action] = useFormState(signInAction, {});
  const { data } = useSession();
  console.table(data);

  return (
    <AccountHero
      type="Login"
      action={action}
      title="CLICK APP LOGIN"
      subTitles={[
        "클릭소프트 입니다.",
        "이제 웹에서 환자의 정보를 확인하세요.",
      ]}
      content={
        <>
          <Input icon={Mail} name="email" placeholder="Email" type="email" />
          <Input
            icon={Lock}
            name="password"
            placeholder="Password"
            type="password"
          />
        </>
      }
      bottomContent={
        <>
          <ButtonL className="w-full">로그인</ButtonL>
          <div className="flex items-center justify-between gap-2">
            <div className="h-[1px] flex-1 bg-gray-300" />
            <span className="text-sm font-bold text-gray-500">OR</span>
            <div className="h-[1px] flex-1 bg-gray-300" />
          </div>
          <ButtonL
            type="button"
            variant={"outline"}
            className="w-full"
            onClick={() => {
              signIn("google");
            }}
          >
            구글로 로그인 하기
          </ButtonL>
        </>
      }
    />
  );
}
