import { IOSheet } from "@/sockets/entities/io-sheet";
import { Header, Table } from "@tanstack/react-table";
import React from "react";
import { flexRender } from "@tanstack/react-table";
import { Prescription } from "@/sockets/entities/prescription";

interface Props {
  table: Table<Prescription>;
  styles: any;
}
export default function PrescriptionColumnHeader({ table, styles }: Props) {
  return table.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <th key={header.id} style={{ width: header.column.getSize() }}>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  ));
}
