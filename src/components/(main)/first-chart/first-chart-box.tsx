import { ContentInfo } from "@/sockets/models/content-info";
import React, { Fragment } from "react";

interface Props {
  details: ContentInfo[];
}

export default function FirstChartBox({ details }: Props) {
  const contents = details.map((d) => (
    <tr key={d.title} className="border-t border-primary/30">
      <td className="p-2 border-r font-semibold">{d.title}</td>
      <td className="whitespace-pre-wrap bg-white p-2">{d.text}</td>
    </tr>
  ));
  return (
    <table className="w-full">
      <colgroup>
        <col className="w-16 bg-primary/20" />
        <col />
      </colgroup>
      <tbody className="p-0">{contents}</tbody>
    </table>
  );
}
