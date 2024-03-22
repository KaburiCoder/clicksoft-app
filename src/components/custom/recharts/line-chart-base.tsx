"use client";
import { ClassNameProps } from "@/lib/props/base-props";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useChartInCheckBox } from "./hooks/use-chart-in-check-box";

export type GraphDataType = {
  xName: string;
  [key: string]: string | number;
};

export interface LineChartBaseProps extends ClassNameProps {
  data: GraphDataType[];
}

export default function LineChartBase({ data, className }: LineChartBaseProps) {
  const { keys, newData, colorMap, checkComponents } = useChartInCheckBox({
    data,
  });

  return (
    <div className="flex flex-1 flex-col border-t">
      <div className="flex flex-wrap justify-center gap-2 p-2">
        {checkComponents}
      </div>
      <ResponsiveContainer className={className}>
        <LineChart data={newData} margin={{ right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="1 3" />
          <XAxis dataKey="xName" />
          <YAxis />
          <Tooltip />
          <Legend />

          {keys.map((key) => (
            <Line
              animationDuration={500}
              animationEasing="ease-in"
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colorMap.get(key)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
