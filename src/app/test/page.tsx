"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Drawer, { CustomDrawerRef } from "@/components/custom/drawer/drawer";
import { Modal } from "@/components/custom/modal";
import { cn } from "@/lib/utils";

export default function TestPage() {
  const ref = useRef<CustomDrawerRef>(null);
  const [rowData, setRowData] = useState<RowData>();

  useEffect(() => {
    const rowData: RowData = new Map();

    // function addToRowData(
    //   rowData: Record<string, TableBody[]>,
    //   key: string,
    //   value: string | undefined,
    //   colSpan: number,
    // ): void {
    //   rowData[key] = [...(rowData[key] ?? []), { value, colSpan }];
    // }

    testData.map((data) => {
      function addToRowData(key: string, body: TableBody) {
        if (rowData.has(key)) {
          rowData.get(key)!.push(body);
        } else {
          rowData.set(key, [body]);
        }
      }

      function addDataToRow(
        data: any,
        keyPrefix: string,
        properties: string[],
        columnCount: number = 4,
      ): void {
        if (columnCount === 1) {
          addToRowData(keyPrefix, { value: data, colSpan: 4 });
          return;
        }

        Array.from({ length: columnCount }, (_, i) => {
          const obj = data?.[i];
          // let colSpan = 1;
          // if (columnCount === 3 && i === 2) {
          //   colSpan = 2;
          // }
          properties.forEach((property) => {
            const objProperty = makeFirstLetterLowerCase(property);
            addToRowData(`${keyPrefix}${property}`, {
              value: obj?.[objProperty],
              // colSpan,
            });
          });
        });
      }

      // 사용 예시
      addDataToRow(data.shortDateText, "년월일", [], 1);
      addDataToRow(data.ibTerm, "입원일수", [], 1);

      addDataToRow(data.vsList, "", [
        "혈압고",
        "혈압저",
        "맥박",
        "호흡",
        "체온",
        "측정시간",
      ]);
      addDataToRow(data.bstList, "BST", ["시간", "수치"]);

      addDataToRow(data.insulinList, "인슐린", [
        "시간",
        "명칭",
        "용량",
        "혈당",
      ]);

      addToRowData("Intake", { value: "D" });
      addToRowData("Intake", { value: "E" });
      addToRowData("Intake", { value: "N", colSpan: 2 });

      addToRowData("IntakeOral", { value: data.intake?.D?.oral });
      addToRowData("IntakeOral", { value: data.intake?.E?.oral });
      addToRowData("IntakeOral", { value: data.intake?.N?.oral, colSpan: 2 });

      addToRowData("IntakeParenteral", { value: data.intake?.D?.parenteral });
      addToRowData("IntakeParenteral", { value: data.intake?.E?.parenteral });
      addToRowData("IntakeParenteral", {
        value: data.intake?.N?.parenteral,
        colSpan: 2,
      });

      addToRowData("Intake총섭취량", { value: data.intake?.D?.총섭취량 });
      addToRowData("Intake총섭취량", { value: data.intake?.E?.총섭취량 });
      addToRowData("Intake총섭취량", {
        value: data.intake?.N?.총섭취량,
        colSpan: 2,
      });

      addToRowData("Output", { value: "D" });
      addToRowData("Output", { value: "E" });
      addToRowData("Output", { value: "N", colSpan: 2 });

      addToRowData("OutputUrine", { value: data.output?.D?.urine });
      addToRowData("OutputUrine", { value: data.output?.E?.urine });
      addToRowData("OutputUrine", { value: data.output?.N?.urine, colSpan: 2 });

      addToRowData("OutputStool용량", { value: data.output?.D?.stool?.용량 });
      addToRowData("OutputStool용량", { value: data.output?.E?.stool?.용량 });
      addToRowData("OutputStool용량", {
        value: data.output?.N?.stool?.용량,
        colSpan: 2,
      });

      addToRowData("OutputStool횟수", { value: data.output?.D?.stool?.횟수 });
      addToRowData("OutputStool횟수", { value: data.output?.E?.stool?.횟수 });
      addToRowData("OutputStool횟수", {
        value: data.output?.N?.stool?.횟수,
        colSpan: 2,
      });

      addToRowData("OutputDrainage", { value: data.output?.D?.drainage });
      addToRowData("OutputDrainage", { value: data.output?.E?.drainage });
      addToRowData("OutputDrainage", {
        value: data.output?.N?.drainage,
        colSpan: 2,
      });

      addToRowData("Output총배설량", {
        value: data.output?.총배설량,
        colSpan: 4,
      });

      Array.from({ length: 3 }).forEach((_, i) => {
        addToRowData(`Fluid${i + 1}`, {
          value: data.fluidList?.[i],
          colSpan: 4,
        });
      });

      Array.from({ length: 3 }).forEach((_, i) => {
        addToRowData(`SideMixed${i + 1}`, {
          value: data.sideMixedList?.[i],
          colSpan: 4,
        });
      });
    });
    setRowData(rowData);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden bg-red-50">
      <div className="max-w-[100%] max-h-[100%] overflow-auto">
        <table className={cn(styles.table)}>
          <colgroup>
            <col className="min-w-[50px]" width={50} />
            <col className="min-w-[80px]" width={80} />
            <col className="min-w-[50px]" width={50} />
          </colgroup>
          <tbody>
            {Object.entries(rowHeaders).map(([key, v]) => (
              <tr key={v.row}>
                {v.cols?.map((c, i) => (
                  <th
                    key={c.value}
                    className={cn(
                      "sticky bg-white",
                      {
                        0: "left-0",
                        1: "left-[50px]",
                        2: "left-[130px]",
                      }[c.col ?? 0],
                    )}
                    rowSpan={c.rowSpan}
                    colSpan={c.colSpan}
                  >
                    {c.value}
                  </th>
                ))}

                {rowData?.get(key)?.map((d, i) => (
                  <td
                    key={`${d.value}_${i}`}
                    className="min-w-10"
                    rowSpan={d.rowSpan}
                    colSpan={d.colSpan}
                  >
                    {d.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TableData {
  row: number;
  value?: string;
  rowSpan?: number;
  colSpan?: number;
  cols?: {
    col?: number;
    value?: string;
    rowSpan?: number;
    colSpan?: number;
  }[];
  data?: TableBody[];
}

interface TableBody {
  value?: string;
  rowSpan?: number;
  colSpan?: number;
}

type RowData = Map<string, TableBody[]>;

const rowHeaders: { [key: string]: TableData } = {
  년월일: {
    row: 0,
    cols: [{ value: "년월일", colSpan: 3 }],
  },
  입원일수: {
    row: 1,
    cols: [{ value: "입원일수", colSpan: 3 }],
  },
  혈압고: {
    row: 2,
    cols: [
      { value: "V.S", rowSpan: 6 },
      { value: "B.P혈압", rowSpan: 2, col: 1 },
      { value: "고", col: 2 },
    ],
  },
  혈압저: {
    row: 3,
    cols: [{ value: "저", col: 2 }],
  },
  맥박: {
    row: 4,

    cols: [{ value: "P(맥박)", colSpan: 2, col: 1 }],
  },
  호흡: {
    row: 5,
    cols: [{ value: "R(호흡)", colSpan: 2, col: 1 }],
  },
  체온: {
    row: 6,
    cols: [{ value: "T(체온)", colSpan: 2, col: 1 }],
  },
  측정시간: {
    row: 7,
    cols: [{ value: "측정시간", colSpan: 2, col: 1 }],
  },
  BST시간: {
    row: 8,
    cols: [
      { value: "Glucose(BST)", rowSpan: 2, colSpan: 2 },
      { value: "시간", col: 2 },
    ],
  },
  BST수치: {
    row: 9,
    cols: [{ value: "수치", col: 2 }],
  },
  인슐린시간: {
    row: 10,
    cols: [
      { value: "Insulin(인슐린)", rowSpan: 4, colSpan: 2 },
      { value: "시간", col: 2 },
    ],
  },
  인슐린명칭: {
    row: 11,
    cols: [{ value: "명칭", col: 2 }],
  },
  인슐린용량: {
    row: 12,
    cols: [{ value: "용량", col: 2 }],
  },
  인슐린혈당: {
    row: 13,
    cols: [{ value: "혈당", col: 2 }],
  },
  Intake: {
    row: 14,
    cols: [
      { value: "섭취/배설", rowSpan: 10 },
      { value: "Intake", colSpan: 2, col: 1 },
    ],
  },
  IntakeOral: {
    row: 15,
    cols: [{ value: "Oral", colSpan: 2, col: 1 }],
  },
  IntakeParenteral: {
    row: 16,
    cols: [{ value: "Parenteral", colSpan: 2, col: 1 }],
  },
  Intake총섭취량: {
    row: 17,
    cols: [{ value: "총섭취량", colSpan: 2, col: 1 }],
  },
  Output: {
    row: 18,
    cols: [{ value: "Output", colSpan: 2, col: 1 }],
  },
  OutputUrine: {
    row: 19,
    cols: [{ value: "Urine", colSpan: 2, col: 1 }],
  },
  OutputStool용량: {
    row: 20,
    cols: [
      { value: "Stool", rowSpan: 2, col: 1 },
      { value: "용량", col: 2 },
    ],
  },
  OutputStool횟수: {
    row: 21,
    cols: [{ value: "횟수", col: 2 }],
  },
  OutputDrainage: {
    row: 22,
    cols: [{ value: "Drainage", colSpan: 2, col: 1 }],
  },
  Output총배설량: {
    row: 23,
    cols: [{ value: "총배설량", colSpan: 2, col: 1 }],
  },
  Fluid1: {
    row: 24,
    cols: [{ value: "Fluid", rowSpan: 3, colSpan: 3 }],
  },
  Fluid2: {
    row: 25,
    cols: [],
  },
  Fluid3: {
    row: 26,
    cols: [],
  },
  SideMixed1: {
    row: 27,
    cols: [{ value: "(Side, Mixed)", rowSpan: 3, colSpan: 3 }],
  },
  SideMixed2: {
    row: 28,
    cols: [],
  },
  SideMixed3: {
    row: 29,
    cols: [],
  },
  식사: {
    row: 30,
    cols: [{ value: "", colSpan: 3 }],
  },
  식사아침: {
    row: 31,
    cols: [
      { value: "식사", rowSpan: 3 },
      { value: "아침", colSpan: 2, col: 1 },
    ],
  },
  식사점심: {
    row: 32,
    cols: [{ value: "점심", colSpan: 2, col: 1 }],
  },
  식사저녁: {
    row: 33,
    cols: [{ value: "저녁", colSpan: 2, col: 1 }],
  },
  호흡시간Header: {
    row: 34,
    cols: [
      { value: "호흡", rowSpan: 5 },
      { value: "CPR(CM) 시간", rowSpan: 2, colSpan: 2 },
    ],
  },
  호흡시간: {
    row: 35,
    cols: [],
  },
  호흡산소량Header: {
    row: 36,
    cols: [
      { value: "Oxygen inhalation", rowSpan: 3, col: 1 },
      { value: "산소량(l/min)", rowSpan: 2, col: 2 },
    ],
  },
  호흡산소량: {
    row: 37,
    cols: [],
  },
  호흡산소총량: {
    row: 38,
    cols: [{ value: "총량", col: 2 }],
  },
};

interface ObservationChart {
  shortDateText: string;
  ibTerm: string;
  vsList?: ObservationVs[];
  bstList?: ObservationBst[];
  insulinList?: ObservationInsulin[];
  intake?: ObservationIntake;
  output?: ObservationOutput;
  fluidList?: string[];
  sideMixedList?: string[];
}

interface ObservationVs {
  [key: string]: string | undefined;
  혈압고?: string;
  혈압저?: string;
  맥박?: string;
  호흡?: string;
  체온?: string;
  측정시간?: string;
}

interface ObservationBst {
  [key: string]: string | undefined;
  시간: string;
  수치: string;
}

interface ObservationInsulin {
  [key: string]: string | undefined;
  시간?: string;
  명칭?: string;
  용량?: string;
  혈당?: string;
}

interface ObservationIntake {
  D?: IntakeData;
  E?: IntakeData;
  N?: IntakeData;
}

interface IntakeData {
  oral?: string;
  parenteral?: string;
  총섭취량?: string;
}

interface ObservationOutput {
  D?: OutputData;
  E?: OutputData;
  N?: OutputData;
  총배설량?: string;
}

interface OutputData {
  urine?: string;
  stool?: {
    용량?: string;
    횟수?: string;
  };
  drainage?: string;
  총배설량?: string;
}

const td: ObservationChart = {
  shortDateText: "2022-01-01",
  ibTerm: "50",
  vsList: [
    {
      혈압고: "1",
      맥박: "22",
      호흡: "33",
    },
    {
      혈압고: "z",
      맥박: "2x",
      호흡: "3c",
    },
  ],
  bstList: [
    {
      시간: "ㅁ",
      수치: "ㄴ",
    },
    {
      시간: "ㄱ",
      수치: "ㄹ",
    },
  ],
  insulinList: [
    { 시간: "11:00", 명칭: "zzz", 용량: "a.1", 혈당: "33" },
    { 시간: "12:00", 명칭: "zzz", 용량: "a.1", 혈당: "33" },
  ],
  intake: {
    D: { oral: "11", parenteral: "zz", 총섭취량: "1321" },
  },
};
const testData: ObservationChart[] = [td, td, td, td, td];

function makeFirstLetterLowerCase(inputString: string): string {
  if (inputString.length === 0) {
    return inputString; // 빈 문자열인 경우 변환 불필요
  }

  return inputString[0].toLowerCase() + inputString.slice(1);
}
