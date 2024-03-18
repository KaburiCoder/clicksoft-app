"use client";
import React from "react";
import { useSessionEx } from "@/lib/hooks/use-session-ex";
import SearchUserButton from "./search-user-button";
import { ChildrenClassNameProps, ChildrenProps } from "@/lib/props/base-props";
import NavBackButton from "./nav-back-button";
import ProfileAvatar from "./profile-avatar";
import { paths } from "@/paths";
import { cn } from "@/lib/utils";

interface Props extends ChildrenClassNameProps {
  hideBackButton?: boolean;
  hideSearchUserButton?: boolean;
  showOnlyBackButton?: boolean;
}

export default function MainHeader({
  className,
  children,
  hideBackButton,
  hideSearchUserButton,
  showOnlyBackButton,
}: Props) {
  return (
    <header
      className={cn(
        "mx-auto flex h-header w-full items-center justify-between overflow-hidden px-4 py-2",
        className,
      )}
    >
      {!hideBackButton && <NavBackButton />}
      <h2 className="font-bold">{children}</h2>
      {!showOnlyBackButton && (
        <div className="flex items-center gap-1">
          {!hideSearchUserButton && <SearchUserButton />}

          <ProfileAvatar usePopover />
        </div>
      )}
    </header>
  );
}
