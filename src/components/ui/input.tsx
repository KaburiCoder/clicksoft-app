import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  errorMessages?: string[];
  wrapperClassName?: string;
  icon?: React.FC<{ className?: string }>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      errorMessages,
      className,
      wrapperClassName,
      type,
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    errorMessage = errorMessage || errorMessages?.join("\n");
    const errorStyles = cn(errorMessage && "text-rose-500");

    return (
      <label className={cn("flex flex-col gap-1", wrapperClassName)}>
        {label && <span>{label}</span>}
        <label
          className={cn(
            "flex h-10 w-full items-center overflow-hidden rounded-md bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            "border border-primary/60 focus-within:border-2",
            errorMessage ? "border-border-error" : "",
            className,
          )}
        >
          {Icon && <Icon className={cn("m-2 text-primary", errorStyles)} />}
          {/* <span>아이콘</span> */}
          <input
            className="h-full w-full px-3 py-2 text-base"
            spellCheck="false"
            style={{ imeMode: "active" }}
            type={type}
            ref={ref}
            {...props}
          />
        </label>
        {errorMessage && (
          <div className={cn("pl-1 text-sm", errorStyles)}>{errorMessage}</div>
        )}
      </label>
    );
  },
);
Input.displayName = "Input";

export { Input };
