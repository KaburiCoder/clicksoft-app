"use client";
import React from "react";
import { useSessionEx } from "@/lib/hooks/useSessionEx";
import SearchUserButton from "./search-user-button";
import { ChildrenProps } from "@/lib/props/base-props";
import NavBackButton from "./nav-back-button";
import ProfileAvatar from "./profile-avatar";
import { paths } from "@/paths";

interface Props extends ChildrenProps {
  hideBackButton?: boolean;
  hideSearchUserButton?: boolean;
}

export default function MainHeader({
  children,
  hideBackButton,
  hideSearchUserButton,
}: Props) {
  return (
    <header className="mx-auto flex h-header w-full items-center justify-between overflow-hidden px-4 py-2">
      {!hideBackButton && <NavBackButton />}
      <div>{children}</div>
      <div className="flex items-center gap-1">
        {!hideSearchUserButton && <SearchUserButton />}

        <ProfileAvatar usePopover />
      </div>
    </header>
  );
}
