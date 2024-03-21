import { IOSheet } from "@/sockets/entities/io-sheet";
import { Header, Table } from "@tanstack/react-table";
import React from "react";
import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { getCommonPinningStyles } from "./io-sheet-table.util";

interface Props {
  table: Table<IOSheet>;
  styles: any;
}
export default function IOSheetColumnHeader({ table, styles }: Props) {
  return table.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header, index) => {
        const rowSpan = getRowSpan(header);
        const canFinIndex = findColIndexById(table, "writer");
        if (rowSpan === null) return null;

        return (
          <th
            className={cn(headerGroup.depth === 0 ? styles.top : "")}
            onClick={() => {
              if (header.column.getIsPinned() === "left") {
                header.column.pin(false);
              } else if ((canFinIndex ?? 999) >= index) {
                header.column.pin("left");
              }
            }}
            key={header.id}
            colSpan={header.colSpan}
            rowSpan={rowSpan}
            style={{ ...getCommonPinningStyles(header.column, "head") }}
          >
            <div className="flex-center flex-col gap-2">
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getIsPinned() && (
                <Pin className="h-4 w-4 fill-orange-50 text-orange-500" />
              )}
            </div>
          </th>
        );
      })}
    </tr>
  ));
}

function getRowSpan(header: Header<IOSheet, unknown>) {
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

  return rowSpan;
}

function findColIndexById(table: Table<IOSheet>, columnId: string) {
  const foundedHeader = table
    .getHeaderGroups()
    .map((hg) => hg.headers.find((h) => h.column.id === columnId));

  return foundedHeader?.[0]?.index;
}
