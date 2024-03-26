import { OrderType, Prescription } from "@/sockets/entities/prescription";
import {
  Cell,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { prescriptionColumns } from "./prescription-columns";
import styles from "./prescription-table.module.scss";
import PrescriptionColumnHeader from "./prescription-column-header";
import { cn } from "@/lib/utils";

interface Props {
  data: Prescription[] | undefined;
}

export default function PrescriptionTable({ data }: Props) {
  const table = useReactTable({
    data: data ?? [],
    columns: prescriptionColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    defaultColumn: {
      size: 50,
    },
  });

  let dateSet = new Set<string>();
  return (
    <table className={cn(styles.table)} style={{ width: table.getTotalSize() }}>
      <thead>
        <PrescriptionColumnHeader table={table} styles={styles} />
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, rowIndex) => {
          const rx = data?.[rowIndex];
          const shortDateText = rx?.shortDateText ?? "";
          const isFirstDate = !dateSet.has(shortDateText);
          const isInstructions = rx?.orderType === OrderType.INSTRUCTIONS;

          dateSet.add(shortDateText);
          const spanCount = data?.filter(
            (d) => d.shortDateText === shortDateText,
          ).length;
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const isDateColumn = cell.column.id === "shortDateText";
                const isSpanedDateColumn = isDateColumn && !isFirstDate;
                const rowSpan =
                  isDateColumn && isFirstDate ? spanCount : undefined;
                const isOrderNameColumn = cell.column.id === "orderName";
                const isInstructionsAndNameColumns =
                  isInstructions && isOrderNameColumn;
                if (isSpanedDateColumn) {
                  return undefined;
                }
                const isGroupColumns =
                  !isDateColumn && rx?.orderType === OrderType.GROUP;
                const isSubItemColumns =
                  !isDateColumn && rx?.orderType === OrderType.SUB_ITEM;

                const context =
                  isInstructions && !(isDateColumn || isOrderNameColumn)
                    ? undefined
                    : flexRender(cell.column.columnDef.cell, cell.getContext());

                return (
                  <td
                    key={cell.id}
                    rowSpan={rowSpan}
                    style={{ width: cell.column.getSize() }}
                    align={cell.column.columnDef.meta?.align}
                    className={cn(
                      "border-b border-r border-slate-200 px-1",
                      rowSpan && "border-l border-slate-200",
                      isInstructionsAndNameColumns
                        ? "font-semibold text-green-600"
                        : "",
                      isGroupColumns ? "bg-orange-200" : "",
                      isSubItemColumns ? "bg-orange-50" : "",
                    )}
                  >
                    {context}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
