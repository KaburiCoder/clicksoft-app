import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound, UserRound } from "lucide-react";
import React from "react";
import ProfilePopover from "./profile-popover";
import { useSessionEx } from "@/lib/hooks/use-session-ex";
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
    <Avatar className={cn("header-item hover:cursor-pointer", className)}>
      <AvatarImage src={src} />
    </Avatar>
  ) : (
    <UserRound
      className={cn(
        "header-item header-item-border bg-green-200 p-2 text-white",
        className,
      )}
    />
  );

  if (usePopover) {
    return <ProfilePopover trigger={avatarComponent} />;
  }
  return avatarComponent;
}

function CircleUser({ className }: ClassNameProps) {
  return (
    <CircleUserRound
      className={cn("header-item p-1 text-slate-500", className)}
    />
  );
}
