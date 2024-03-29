"use client";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChildrenClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface Props {
  defaultCondition: PrescriptionCondition | undefined;
  onChange: (args?: PrescriptionCondition) => void;
}

export type PrescriptionCondition = {
  dis: boolean;
  note: boolean;
  order: {
    oral: boolean;
    inject: boolean;
    treat: boolean;
    radiation: boolean;
    exam: boolean;
  };
};
export default function PrescriptionOptions({
  defaultCondition,
  onChange,
}: Props) {
  const [condition, setCondition] = useState<PrescriptionCondition>({
    dis: defaultCondition?.dis ?? false,
    note: defaultCondition?.note ?? false,
    order: {
      oral: defaultCondition?.order?.oral ?? false,
      inject: defaultCondition?.order?.inject ?? false,
      treat: defaultCondition?.order?.treat ?? false,
      radiation: defaultCondition?.order?.radiation ?? false,
      exam: defaultCondition?.order?.exam ?? false,
    },
  });
  const [isPresAllChecked, setIsPresAllChecked] = useState(false);
  const pres = condition.order;

  useEffect(() => {
    setIsPresAllChecked(
      Object.values(condition.order).every((checked) => checked),
    );
  }, [condition]);
  function handleMainCheckChange(name: string, checked: boolean): void {
    if (name === "pres") {
      setCondition((prev) => ({
        ...prev,
        order: {
          exam: checked,
          inject: checked,
          oral: checked,
          radiation: checked,
          treat: checked,
        },
      }));
    } else {
      setCondition((prev) => ({ ...prev, [name]: checked }));
    }
  }

  function handleSubCheckChange(name: string, checked: boolean): void {
    setCondition((prev) => {
      const pres = { ...prev.order, [name]: checked };
      return {
        ...prev,
        order: pres,
      };
    });
  }

  useEffect(() => {
    onChange(condition);
  }, [condition]);

  return (
    <div className="flex min-w-52 flex-col gap-6">
      <div className="flex gap-6">
        <MainCheckbox
          name="dis"
          checked={condition.dis}
          onChange={handleMainCheckChange}
        >
          상병
        </MainCheckbox>
        <MainCheckbox
          name="note"
          checked={condition.note}
          onChange={handleMainCheckChange}
        >
          참고사항
        </MainCheckbox>
      </div>
      <Card className="relative grid grid-cols-2 gap-y-4 px-4 py-6">
        <MainCheckbox
          name="pres"
          checked={isPresAllChecked}
          className="absolute -left-[1px] -top-3 bg-white"
          onChange={handleMainCheckChange}
        >
          진료내역
        </MainCheckbox>
        <CstCheckbox
          name="oral"
          checked={isPresAllChecked || pres.oral}
          onChange={handleSubCheckChange}
        >
          내복
        </CstCheckbox>
        <CstCheckbox
          name="inject"
          checked={isPresAllChecked || pres.inject}
          onChange={handleSubCheckChange}
        >
          주사
        </CstCheckbox>
        <CstCheckbox
          name="treat"
          checked={isPresAllChecked || pres.treat}
          onChange={handleSubCheckChange}
        >
          처치
        </CstCheckbox>
        <CstCheckbox
          name="radiation"
          checked={isPresAllChecked || pres.radiation}
          onChange={handleSubCheckChange}
        >
          방사
        </CstCheckbox>
        <CstCheckbox
          name="exam"
          checked={isPresAllChecked || pres.exam}
          onChange={handleSubCheckChange}
        >
          검사
        </CstCheckbox>
      </Card>
    </div>
  );
}

interface CheckboxProps extends ChildrenClassNameProps {
  name: string;
  checked?: boolean;
  onChange?: (name: string, checked: boolean) => void;
}
function MainCheckbox(props: CheckboxProps) {
  const { className, ...etcProps } = props;
  return (
    <CstCheckbox
      className={cn("font-bold text-green-600", className)}
      {...etcProps}
    />
  );
}

function CstCheckbox({
  className,
  children,
  checked,
  name,
  onChange,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 text-base text-gray-500",
        className,
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onChange?.bind(null, name)}
      />
      {children}
    </label>
  );
}
