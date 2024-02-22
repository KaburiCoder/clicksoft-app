"use client";
import { RadioButton } from "@/components/custom/radio-button";
import ButtonL from "@/components/ui/custom/button-l";
import { cn } from "@/lib/utils";
import { Weib } from "@/sockets/dtos/get-patient-info.dto";
import React, { useEffect, useState } from "react";

export default function TestPage() {
  const [value, setValue] = useState<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }

  return (
    <div>
      <RadioButton
        defaultValue="1"
        items={[
          { value: Weib.입원.toString(), text: "입원" },
          { value: Weib.외래.toString(), text: "외래" },
          { value: Weib.전체.toString(), text: "전체" },
        ]}
        onChange={(d) => {
          console.log("onChange", d);
        }}
      />
    </div>
  );
}
