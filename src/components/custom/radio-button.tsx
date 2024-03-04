"use client";
import { ClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props extends ClassNameProps {
  defaultValue: string;
  items: {
    value: string;
    text: string;
  }[];
  onChange: (value: string) => void;
  isPending?: boolean;
}

let loaded: boolean = false;

export function RadioButton({
  className,
  defaultValue,
  items,
  onChange,
  isPending,
}: Props) {
  const [value, setValue] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
    onChange(e.target.value);
  }

  useEffect(() => {
    setValue(defaultValue);

    if (!loaded) {
      loaded = true;
    }
  }, [defaultValue]);

  const components = items.map((item, i) => {
    const checked = value === item.value;
    const commonClass = "flex-center flex-1 rounded p-2 hover:cursor-pointer";
    const checkedClass = "text-secondary bg-primary hover:bg-primary/90";
    const uncheckedClass = "bg-secondary hover:bg-secondary/90";
    return (
      <label
        key={`${item.value}`}
        className={cn(commonClass, checked ? checkedClass : uncheckedClass)}
      >
        <input
          className="no-radio"
          type="radio"
          name="weib"
          disabled={isPending}
          value={item.value}
          checked={checked}
          onChange={handleChange}
        />
        {item.text}
      </label>
    );
  });

  return (
    <div className={cn("flex justify-stretch gap-2", className)}>
      {components}
    </div>
  );
}
