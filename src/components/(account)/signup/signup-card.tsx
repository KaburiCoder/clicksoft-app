"use client";
import AccountHero from "@/components/(account)/account-hero";
import ErrorText from "@/components/custom/error-text";
import ButtonL from "@/components/ui/custom/button-l";
import { Input } from "@/components/ui/input";
import { signUpAction } from "@/db/actions/sign-up";
import { Key, Lock, Mail, User } from "lucide-react";
import React from "react";
import { useFormState } from "react-dom";

export default function SignupCard() {
  const [state, action] = useFormState(signUpAction, {});

  return (
    <AccountHero
      type="SignUp"
      action={action}
      showX={true}
      title="SIGNUP"
      subTitles={[
        "클릭소프트 입니다.",
        "이제 웹에서 환자의 정보를 확인하세요.",
      ]}
      content={
        <>
          <Input
            icon={Mail}
            name="email"
            placeholder="Email"
            type="email"
            errorMessage={state.errors?.email?.join("\n")}
          />
          <Input
            icon={Lock}
            name="password"
            placeholder="Password"
            type="password"
            errorMessage={state.errors?.password?.join("\n")}
          />
          <Input
            icon={Lock}
            name="confirmPassword"
            placeholder="Password Confirm"
            type="password"
            errorMessage={state.errors?.confirmPassword?.join("\n")}
          />
          {/* <Input
            icon={Key}
            name="key"
            placeholder="Organization Key"
            type="key"
            errorMessage={state.errors?.key?.join("\n")}
          />
          <Input
            icon={User}
            name="userId"
            placeholder="Window UserId"
            type="userId"
            errorMessage={state.errors?.userId?.join("\n")}
          /> */}
          <ErrorText errorMessage={state.errors?.form?.join("\n")} />
        </>
      }
      bottomContent={<ButtonL className="w-full">회원가입</ButtonL>}
    />
  );
}
