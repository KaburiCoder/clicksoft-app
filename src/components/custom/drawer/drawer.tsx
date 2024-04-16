"use client";
import React, { useEffect, useState, useImperativeHandle, useRef } from "react";
import styles from "./drawer.module.css";
import { cn } from "@/lib/utils";
import { ChildrenClassNameProps } from "@/lib/props/base-props";
import { useCSR } from "kbr-nextjs-shared/hooks";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

interface CustomDrawerProps extends ChildrenClassNameProps {
  anchor?: "left" | "right" | "top" | "bottom";
  zIndex?: number;
  onOpenChange?: (open: boolean) => void;
}

export interface CustomDrawerRef {
  open: () => void;
  close: () => void;
}

const WIDTH_PROP = "--drawer-child-width";
const HEIGHT_PROP = "--drawer-child-height";
const CustomDrawer = React.forwardRef<CustomDrawerRef, CustomDrawerProps>(
  ({ zIndex, className, children, onOpenChange, anchor = "left" }, ref) => {
    const [open, setOpen] = useState(false);
    const [closeCalled, setCloseCalled] = useState(false);
    const { isCSR } = useCSR();
    const isOffsetReadRef = useRef(false); // Drawer의
    const divRef = useRef<HTMLDivElement>(null);
    const divCur = divRef.current;

    // Drawer의 시작 너비, 높이 CSS변수 세팅
    // (isOffsetReadRef로 한번 세팅되면 다시 세팅하지 않도록)
    if (
      open &&
      divCur?.offsetWidth &&
      divCur?.offsetHeight &&
      !isOffsetReadRef.current
    ) {
      isOffsetReadRef.current = true;

      document.documentElement.style.setProperty(
        WIDTH_PROP,
        `${divCur.offsetWidth}px`,
      );
      document.documentElement.style.setProperty(
        HEIGHT_PROP,
        `${divCur.offsetHeight}px`,
      );
    }

    useEffect(() => {
      onOpenChange?.(open);
      setCloseCalled(!open);
      if (!open) {
        isOffsetReadRef.current = false;
      }
    }, [open]);

    function handleBackdropClose() {
      setCloseCalled(true);
      // 애니메이션 보여주기 위해 일정 시간 후 open을 false로 변경
      setTimeout(() => {
        setOpen(false);
      }, 300);
    }

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }));

    if (!open || !isCSR) return <></>;

    const portal = ReactDOM.createPortal(
      <div
        className={cn(
          styles.parent,
          "fixed left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-10",
        )}
        onClick={handleBackdropClose}
        style={{ zIndex }}
      >
        <div
          ref={divRef}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            styles.child,
            styles[anchor],
            closeCalled ? "" : styles.open,
            className,
          )}
        >
          <X
            className="absolute right-2 top-2 text-gray-500 hover:cursor-pointer hover:text-primary"
            onClick={handleBackdropClose}
          />
          {children}
        </div>
      </div>,
      document.getElementById("drawer-root")!,
    );

    return portal;
  },
);

CustomDrawer.displayName = "Drawer";
export default CustomDrawer;
