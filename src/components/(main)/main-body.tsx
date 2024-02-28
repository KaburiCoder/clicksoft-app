"use client";
import React from "react";
import Image from "next/image";
import { MenuCard } from "../custom/menu-card";
import {
  ActivitySquare,
  BookHeart,
  ClipboardPlus,
  NotebookPen,
  ScrollText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import {
  LottieProgressNote,
  LottieNursingRecord,
  LottieVitalSign,
  LottieIOSheet,
  LottiePtProgress,
} from "../custom/lotties/lottie-main";

export default function MainBody() {
  const { push } = useRouter();
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
            />
            <MenuCard
              title="I/O Sheet"
              description="I/O Sheet"
              icon={LottieIOSheet}
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

// <div className="relative flex h-full flex-col overflow-scroll bg-red-100">
// <Image
//   className="absolute object-cover"
//   src={"/images/bg_ward_menu3.jpg"}
//   alt=""
//   fill
// />
// <div className="absolute top-0 z-10 h-36 w-full"></div>

// <MainWrapper className="bg-green-25 absolute top-32 z-20 flex w-full flex-col rounded-t-2xl py-2 shadow-xl">
//   {/* <Image className="absolute -z-10 object-cover" src={'/images/bg_ward_menu3.jpg'} alt="" fill /> */}
//   <div className="py-4">
//     <span className="font-bold text-primary">병동 기록</span>을
//     확인하세요!
//   </div>
//   <div className="grid grid-cols-2 gap-4">
//     <MenuCard
//       title="경과기록"
//       description="경과기록을 한눈에!"
//       icon={NotebookPen}
//     />
//     <MenuCard
//       title="간호기록"
//       description="간호해줘요...ㅠㅠ"
//       icon={BookHeart}
//     />
//     <MenuCard
//       title="Vital sign"
//       description="바이탈 사인!"
//       icon={ActivitySquare}
//     />
//     <MenuCard
//       title="I/O Sheet"
//       description="I/O Sheet"
//       icon={ClipboardPlus}
//     />
//     <MenuCard
//       title="PT 경과기록"
//       description="PT 경과기록"
//       icon={ScrollText}
//     />
//     <MenuCard
//       title="경과기록"
//       description="경과기록을 한눈에!"
//       icon={ScrollText}
//     />
//   </div>

//   {/* <div className="py-4">
//     <span className="font-bold text-primary">병동 기록</span>을
//     확인하세요!
//   </div>
//   <div className="grid grid-cols-2 gap-4">
//     <MenuCard title="경과기록" description="경과기록을 한눈에!" />
//     <MenuCard title="간호기록" description="간호해줘요...ㅠㅠ" />
//     <MenuCard title="Vital sign" description="바이탈 사인!" />
//     <MenuCard title="I/O Sheet" description="I/O Sheet" />
//     <MenuCard title="PT 경과기록" description="PT 경과기록" />
//     <MenuCard title="경과기록" description="경과기록을 한눈에!" />
//   </div> */}
// </MainWrapper>
// </div>
