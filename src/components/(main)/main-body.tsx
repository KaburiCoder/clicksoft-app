"use client";
import React from "react";
import { MenuCard } from "../custom/menu-card";
import { paths } from "@/paths";
import {
  LottiePrescription,
  LottieProgressNote,
  LottieNursingRecord,
  LottieVitalSign,
  LottieIOSheet,
  LottiePtProgress,
  LottieInsulin,
  LottieFirstChart,
  LottieScan,
  LottieConsult,
  LottieObservation,
  LottieBasicExam,
} from "../custom/lotties/lottie-main";

const menuGroups: MenuGroupData[] = [
  {
    highlightText: "진료기록",
    text: "을 확인하세요.",
    items: [
      {
        title: "진료내역",
        description: "진료내역",
        lottie: LottiePrescription,
        href: paths.prescription,
      },
      {
        title: "초진차트",
        description: "초진기록",
        lottie: LottieFirstChart,
        href: paths.firstChart,
      },
      {
        title: "컨설트",
        description: "Consult",
        lottie: LottieConsult,
        href: paths.consult,
      },
      {
        title: "임상관찰기록",
        description: "임상관찰기록",
        lottie: LottieObservation,
        href: paths.observationChart,
      },
    ],
  },
  {
    highlightText: "병동기록",
    text: "을 확인하세요.",
    items: [
      {
        title: "경과기록",
        description: "경과기록",
        lottie: LottieProgressNote,
        href: paths.progressNote,
      },
      {
        title: "간호기록",
        description: "간호기록",
        lottie: LottieNursingRecord,
        href: paths.nursingRecord,
      },
      {
        title: "Vital sign",
        description: "Vital sign",
        lottie: LottieVitalSign,
        href: paths.vitalSign,
      },
      {
        title: "I/O Sheet",
        description: "I/O Sheet",
        lottie: LottieIOSheet,
        href: paths.ioSheet,
      },
      {
        title: "PT 경과기록",
        description: "PT 경과기록",
        lottie: LottiePtProgress,
        href: paths.ptProgress,
      },
      {
        title: "인슐린",
        description: "인슐린",
        lottie: LottieInsulin,
        href: paths.insulin,
      },
      {
        title: "기록지 스캔",
        description: "기록지 스캔",
        lottie: LottieScan,
        href: paths.scan,
      },
      {
        title: "기초검사",
        description: "기초검사",
        lottie: LottieBasicExam,
        href: paths.basicExam,
      },
    ],
  },
];

export default function MainBody() {
  const groupComponents = menuGroups.map((gr) => (
    <MenuGroup key={gr.highlightText} groupData={gr} />
  ));

  return (
    <main className="relative flex h-full w-full flex-col overflow-auto p-0">
      {/* <Image
        className="absolute h-full w-full object-cover"
        src={"/images/bg_ward_menu3.jpg"}
        alt=""
        fill
      /> */}

      <div className="relative">
        <div className="flex flex-col gap-4 p-4">{groupComponents}</div>
      </div>
    </main>
  );
}

interface TitleProps {
  hightlightText: string;
  text: string;
}

function Title({ hightlightText, text }: TitleProps) {
  return (
    <span className="mb-2 w-fit border-b border-solid border-primary p-2">
      <span className="text-base font-semibold text-green-600">
        {hightlightText}
      </span>
      {text}
    </span>
  );
}

interface MenuGroupProps {
  groupData: MenuGroupData;
}

function MenuGroup({
  groupData: { highlightText, text, items },
}: MenuGroupProps) {
  const menuCards = items.map((item) => (
    <MenuCard key={item.title} {...item} />
  ));
  return (
    <div className="flex flex-col">
      <Title hightlightText={highlightText} text={text} />
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {menuCards}
      </div>
    </div>
  );
}

interface MenuGroupData {
  highlightText: string;
  text: string;
  items: MenuItemGroupData[];
}

interface MenuItemGroupData {
  title: string;
  description: string;
  lottie: React.FC<any>;
  href: string;
}
