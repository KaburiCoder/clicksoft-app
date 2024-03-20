import LineChartBase, {
  GetLineChartObjects,
  GraphDataType,
  LineChartBaseProps,
} from "@/components/custom/line-chart-base";
import { VitalSign } from "@/sockets/models/vital-sign";
import React, { useEffect, useState } from "react";

interface Props {
  items: VitalSign[] | undefined;
}

export default function VitalSignGraph({ items }: Props) {
  if (!items || items.length === 0) return <></>;

  const data = items
    ?.reduce((acc: GraphDataType[], cur) => {
      const obj: DataType = { xName: cur.writeDateFullText };
      cur.details.forEach((d) => {
        obj[d.title] = parseFloat(d.value);
      });

      acc.push(obj);

      return acc;
    }, [] satisfies DataType[])
    .reverse();

  return <LineChartBase data={data} />;
}

export type DataType = {
  xName: string;
  [key: string]: string | number;
};
