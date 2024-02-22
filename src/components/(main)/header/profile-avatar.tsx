import IconPersonCircle from "@/components/custom/icon-person.circle";
import RoundButton from "@/components/custom/round-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { imgPaths } from "@/paths";

import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProfilePopover from "./profile-popover";
import { useSessionEx } from "@/lib/hooks/useSessionEx";
import { ClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";

interface Props extends ClassNameProps {
  usePopover?: boolean;
}
export default function ProfileAvatar({ className, usePopover }: Props) {
  const { sessionUser, status } = useSessionEx();
  const src = sessionUser?.image;

  if (status !== "authenticated") return <CircleUser />;

  const avatarComponent = src ? (
    <Avatar className={cn("h-10 w-10 hover:cursor-pointer", className)}>
      <AvatarImage src={src} />
    </Avatar>
  ) : (
    <CircleUser className={className} />
  );

  if (usePopover) {
    return <ProfilePopover trigger={avatarComponent} />;
  }
  return avatarComponent;
}

function CircleUser({ className }: ClassNameProps) {
  return (
    <CircleUserRound
      className={cn("h-10 w-10 p-1 text-slate-500", className)}
    />
  );
}
