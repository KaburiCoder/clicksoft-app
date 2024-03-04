"use client";
import React from "react";
import Image from "next/image";
import { MenuCard } from "../custom/menu-card";
import { paths } from "@/paths";
import {
  LottieProgressNote,
  LottieNursingRecord,
  LottieVitalSign,
  LottieIOSheet,
  LottiePtProgress,
} from "../custom/lotties/lottie-main";

export default function MainBody() {
  return (
    <main className="relative flex h-full w-full flex-col overflow-auto bg-red-100 p-0">
      <Image
        className="absolute h-full w-full object-cover"
        src={"/images/bg_ward_menu3.jpg"}
        alt=""
        fill
      />

      <div className="relative bg-white">
        <div className="flex flex-col p-4">
          <span className="mb-2 w-fit border-b border-solid border-primary bg-white p-2">
            <span className="text-base font-semibold text-green-600">
              병동기록
            </span>
            을 확인하세요!
          </span>
          <div className="grid w-full grid-cols-2 gap-4  ">
            <MenuCard
              title="경과기록"
              description="경과기록을 한눈에!"
              icon={LottieProgressNote}
              href={paths.progressNote}
            />
            <MenuCard
              title="간호기록"
              description="간호해줘요...ㅠㅠ"
              icon={LottieNursingRecord}
              href={paths.nursingRecord}
            />
            <MenuCard
              title="Vital sign"
              description="바이탈 사인!"
              icon={LottieVitalSign}
              href={paths.vitalSign}
            />
            <MenuCard
              title="I/O Sheet"
              description="I/O Sheet"
              icon={LottieIOSheet}
              href={paths.ioSheet}
            />
            <MenuCard
              title="PT 경과기록"
              description="PT 경과기록"
              icon={LottiePtProgress}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
