"use client";
import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type HeroType = "Login" | "SignUp" | "RegistKey" | "FindPassword";
interface Props {
  title: string;
  content: React.ReactNode;
  bottomContent: React.ReactNode;
  type: HeroType;
  subTitles?: string[];
  showX?: boolean;
  action?: any;
}

export default function AccountHero({
  title,
  subTitles,
  content,
  bottomContent,
  showX,
  type,
  action,
}: Props) {
  const { back } = useRouter();
  const subTitleComponents = subTitles?.map((st, i) => (
    <p key={`${st}${i}`} className="text-sm text-primary/70">
      {st}
    </p>
  ));

  return (
    <>
      <form action={action}>
        <div className="relative z-10 flex flex-col gap-10 rounded-lg bg-background p-14 shadow">
          {showX && (
            <Button
              className="absolute right-4 top-4 rounded bg-primary p-2"
              type="button"
              onClick={back}
            >
              <X className="text-white" />
            </Button>
          )}
          <section>
            <h2 className="mb-2 text-3xl font-extrabold text-primary">
              {title}
            </h2>
            {subTitleComponents}
          </section>
          <section className="flex flex-col gap-2">
            {content}
            <div className="flex w-full justify-end gap-4">
              <LinkComponents type={type} />
            </div>
          </section>
          <section className="flex flex-col gap-2">{bottomContent}</section>
        </div>
      </form>
      <Image
        src={"/images/account_background.jpg"}
        className="fixed h-full w-full object-cover"
        alt="배경"
        width={1024}
        height={1024}
      />
    </>
  );
}

function LinkComponents({ type }: { type: HeroType }) {
  const linkComponents = [];
  if (type === "RegistKey") {
    return <></>;
  }

  if (type !== "SignUp") {
    linkComponents.push(
      <Link key="/signup" href={"/signup"} className="text-sm text-slate-500">
        회원가입
      </Link>,
    );
  }

  if (type !== "FindPassword") {
    linkComponents.push(
      <Link key="/findpw" href={"/findpw"} className="text-sm text-slate-500">
        비밀번호 찾기
      </Link>,
    );
  }

  return linkComponents;
}
