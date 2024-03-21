"use client";
import { ClassNameProps } from "@/lib/props/base-props";
import React, { useState } from "react";
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

export type GraphDataType = {
  xName: string;
  [key: string]: string | number;
};

export interface LineChartBaseProps extends ClassNameProps {
  data: GraphDataType[];
}

export default function LineChartBase({ data, className }: LineChartBaseProps) {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const obj = GetLineChartObjects(data);
  const checkComponents = obj.map(({ key, color }) => {
    return (
      <label
        key={key}
        className="flex items-center gap-1 text-sm"
        style={{ color }}
      >
        <input
          type="checkbox"
          checked={checkedKeys.includes(key)}
          onChange={(e) => {
            if (e.target.checked) {
              setCheckedKeys((prev) => {
                return [...prev, key];
              });
            } else {
              setCheckedKeys((prev) => {
                return prev.filter((p) => p !== key);
              });
            }
          }}
        />
        {key}
      </label>
    );
  });
  const resultKeys =
    checkedKeys.length === 0 ? obj.map((o) => o.key) : checkedKeys;

  return (
    <div className="flex flex-1 flex-col border-t">
      <div className="flex flex-wrap justify-center gap-2 p-2">
        {checkComponents}
      </div>
      <ResponsiveContainer className={className}>
        <LineChart data={data} margin={{ right: 20, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="1 3" />
          <XAxis dataKey="xName" />
          <YAxis />
          <Tooltip />
          <Legend />

          {resultKeys.map((key) => (
            <Line
              animationDuration={500}
              animationEasing="ease-in"
              key={key}
              type="monotone"
              dataKey={key}
              stroke={obj.find((o) => o.key === key)?.color}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function GetLineChartObjects(data: GraphDataType[]) {
  const keySet = data?.reduce((acc: Set<string>, cur) => {
    const keys = Object.keys(cur);
    keys.forEach((key) => {
      if (key !== "xName") acc.add(key);
    });

    return acc;
  }, new Set<string>());

  const keys = Array.from(keySet ?? new Set<string>());

  return keys.map((key, i) => ({
    key,
    color: colors?.[i],
  }));
}

const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#aec7e8",
  "#ffbb78",
  "#98df8a",
  "#ff9896",
  "#c5b0d5",
  "#c49c94",
  "#f7b6d2",
  "#c7c7c7",
  "#dbdb8d",
  "#9edae5",
  "#393b79",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
