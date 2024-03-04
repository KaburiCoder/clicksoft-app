"use client";
import React from "react";
import styles from "./page.module.css";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ioSheetTableColumns } from "@/components/(main)/io-sheet/table/io-sheet-column";

export default function TestPage() {
  return (
    <div>
      <MyTable />
    </div>
  );
}

function MyTable() {
  return (
    <table className={styles.table}>
      <colgroup>
        <col className="min-w-20" />
        <col className="min-w-10" />
        <col className="min-w-10" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
        <col className="min-w-14" />
      </colgroup>
      <thead className={styles.thead}>
        <tr>
          <th rowSpan={3}>일자</th>
          <th rowSpan={3}>구분</th>
          <th rowSpan={3}>시간</th>
          <th rowSpan={3}>작성자</th>
          <th colSpan={20}>Intake</th>
        </tr>
        <tr>
          <th rowSpan={2}>종류</th>
          <th colSpan={2}>Diet</th>
          <th>Water</th>
          <th colSpan={3}>Etc</th>
          <th colSpan={3}>Fluid</th>
        </tr>
        <tr>
          <th>g</th>
          <th>kcal</th>
          <th>cc</th>
          <th>내용</th>
          <th>cc</th>
          <th>kcal</th>
          <th>종류</th>
          <th>cc</th>
          <th>kcal</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>
  );
}
