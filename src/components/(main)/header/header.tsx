"use client";
import React, { useEffect } from "react";
import SearchUserButton from "./search-user-button";
import { ChildrenClassNameProps } from "@/lib/props/base-props";
import NavBackButton from "./nav-back-button";
import ProfileAvatar from "./profile-avatar";
import HeaderWrapper from "../layouts/header-wrapper";

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
    <HeaderWrapper className={className}>
      {!hideBackButton && <NavBackButton />}
      <h2 className="font-bold">{children}</h2>
      {!showOnlyBackButton && (
        <div className="flex items-center gap-1">
          {!hideSearchUserButton && <SearchUserButton />}

          <ProfileAvatar usePopover />
        </div>
      )}
    </HeaderWrapper>
  );
}
