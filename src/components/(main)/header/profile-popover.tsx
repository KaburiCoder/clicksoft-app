"use client";
import ButtonL from "@/components/ui/custom/button-l";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import ProfileAvatar from "./profile-avatar";
import { useSessionEx } from "@/lib/hooks/use-session-ex";
import Logo from "@/components/custom/logo";
import { signOut } from "next-auth/react";

interface Props {
  trigger: React.ReactNode;
}
export default function ProfilePopover({ trigger }: Props) {
  const { sessionUser, user } = useSessionEx();

  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-fit min-w-72">
        <div className="flex flex-col gap-8">
          {/* header */}
          <div className="flex items-center justify-between">
            <Logo />
            <ButtonL
              onClick={() => {
                signOut();
              }}
              variant={"destructive"}
            >
              로그아웃
            </ButtonL>
          </div>

          <div className="flex items-center gap-4">
            <ProfileAvatar className="!h-16 !w-16" />
            <div>
              <div className="py-1 text-xl font-bold">
                {`${sessionUser?.name}(${user?.localId})`}
              </div>
              <div className="text-sm font-semibold text-slate-500">
                {sessionUser?.email}
              </div>
            </div>
          </div>
          <ButtonL variant={"outline"}>계정관리</ButtonL>
        </div>
      </PopoverContent>
    </Popover>
  );
}
