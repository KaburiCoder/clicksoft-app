import LineChartBase, {
  GraphDataType,
} from "@/components/custom/recharts/line-chart-base";
import { TitleValueDetail } from "@/sockets/models/title-value-detail";
import React from "react";

interface ItemWithDetails {
  [key: string]: any;
  details: TitleValueDetail[];
}

interface Props<T extends ItemWithDetails> {
  xName: string;
  items: T[] | undefined;
}

export default function TitleValueGraph<T extends ItemWithDetails>({
  xName,
  items,
}: Props<T>) {
  if (!items || items.length === 0) return <></>;

  const data = items
    ?.reduce((acc: GraphDataType[], cur) => {
      const obj: GraphDataType = { xName: cur[xName] as string };
      cur.details.forEach((d) => {
        obj[d.title] = parseFloat(d.value);
      });

      acc.push(obj);

      return acc;
    }, [] satisfies GraphDataType[])
    .reverse();

  return <LineChartBase data={data} />;
}
