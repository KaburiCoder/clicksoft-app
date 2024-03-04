import React, { Fragment, useState } from "react";
import styles from "./io-sheet-table.module.scss";
import { ioSheetTableColumns } from "./io-sheet-column";
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IOSheet } from "@/sockets/models/io-sheet";
import { cn } from "@/lib/utils";

interface Props {
  defaultData: IOSheet[] | undefined;
}
export default function IOSheetTable({ defaultData }: Props) {
  const [data, setData] = React.useState(() =>
    defaultData ? [...defaultData] : [],
  );
  const table = useReactTable({
    data,
    columns: ioSheetTableColumns,
    getCoreRowModel: getCoreRowModel(),

    // columnResizeMode: "onEnd",
    defaultColumn: {
      size: 50,
      minSize: 50,
      maxSize: 500,
    },
  });
  const { setClearIoSheets, pushIoSheets, getSum, getRowTotalSum } =
    useTotalCalculate();

  return (
    <table
      className={cn(styles.table)}
      style={{ width: table.getCenterTotalSize() }}
    >
      <thead >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const columnRelativeDepth = header.depth - header.column.depth;

              if (header.column.depth === 0 && header.depth > 1) {
                return null;
              }

              if (
                !header.isPlaceholder &&
                columnRelativeDepth > 1 &&
                header.id === header.column.id
              ) {
                return null;
              }

              let rowSpan = 1;
              if (header.isPlaceholder) {
                const leafs = header.getLeafHeaders();
                rowSpan = leafs[leafs.length - 1].depth - header.depth;
              }

              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  rowSpan={rowSpan}
                  className="border-separate"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, index, array) => {
          const curData = array[index];
          const nextData = array?.[index + 1];
          const isOdd = index % 2 === 0;
          const showTotal =
            !nextData ||
            curData.original.shortDateText !== nextData.original.shortDateText;

          setClearIoSheets(showTotal);
          pushIoSheets(curData.original);
          return (
            <Fragment key={row.id}>
              <tr className={index % 2 === 0 ? "bg-primary/10" : ""}>
                {row.getVisibleCells().map((cell) => {
                  const total = getRowTotalSum(
                    cell.column.id,
                    cell.row.original,
                  );
                  const isIntake = cell.column.id.startsWith("intake");

                  //sssssssss
                  return (
                    <td
                      key={cell.id}
                      align={cell.column.columnDef.meta?.align ?? "center"}
                      className={cn(
                        "border border-primary-sm px-1",
                        isIntake ? (isOdd ? "bg-slate-50" : "bg-white") : "",
                      )}
                    >
                      {total !== undefined
                        ? total === 0
                          ? undefined
                          : total.toLocaleString()
                        : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                    </td>
                  );
                })}
              </tr>
              {showTotal && (
                <tr className="bg-primary/30 font-semibold text-rose-500">
                  {row.getVisibleCells().map((cell, index) => {
                    const colId = cell.column.id;
                    const isIntake = colId.startsWith("intake");
                    const sum = getSum(colId);

                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          "border border-primary-sm px-1",
                          isIntake ? "bg-slate-200" : "",
                        )}
                        align={cell.column.columnDef.meta?.align ?? "center"}
                      >
                        {index === 0 ? "합계" : sum?.toLocaleString()}
                      </td>
                    );
                  })}
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

const useTotalCalculate = () => {
  let ioSheets: IOSheet[] = [];
  let isClearIoSheets: boolean = false;
  const [totalCols] = useState([
    "intake.total.cc",
    "intake.total.kcal",
    "outputs.total",
  ]);
  const [sumCols] = useState([
    "intake.diet.g",
    "intake.diet.kcal",
    "intake.water.cc",
    "intake.etc.cc",
    "intake.etc.kcal",
    "intake.fluid.cc",
    "intake.fluid.kcal",
    "outputs.urine.cc",
    "outputs.stool.cc",
    "outputs.vomit",
    "outputs.etc",
    ...totalCols,
  ]);

  function setClearIoSheets(showTotal: boolean) {
    if (isClearIoSheets) {
      ioSheets = [];
      isClearIoSheets = false;
    }

    if (showTotal) {
      isClearIoSheets = true;
    }
  }

  function pushIoSheets(ioSheet: IOSheet) {
    ioSheets.push(ioSheet);
  }

  function getSum(colId: string) {
    if (!sumCols.includes(colId)) return undefined;
    const cols = colId.split(".");
    if (!cols) return;

    const sum = ioSheets.reduce((sum, acc) => {
      const value = getValue(acc, cols);
      const numValue = parseFloat(value);
      return sum + (isNaN(numValue) ? 0 : numValue);
    }, 0);

    return sum === 0 ? undefined : sum;
  }

  function getRowTotalSum(colId: string, ioSheet: IOSheet) {
    if (!totalCols.includes(colId)) return undefined;
    const cols = colId.split(".");
    if (!cols) return;

    return getValue(ioSheet, cols) as number;
  }

  function getValue(obj: { [key: string]: any }, keys: string[]): any {
    const currentKey = keys[0];

    if (keys.length === 1) {
      // 키 배열의 길이가 1이면 최종 값을 반환
      return obj[currentKey];
    } else {
      // 키 배열의 길이가 1보다 크면 재귀적으로 호출
      const nextObj = obj[currentKey];
      const remainingKeys = keys.slice(1);
      return nextObj ? getValue(nextObj, remainingKeys) : undefined;
    }
  }

  return {
    setClearIoSheets,
    pushIoSheets,
    getSum,
    getRowTotalSum,
  };
};
