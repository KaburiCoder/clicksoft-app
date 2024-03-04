import React from "react";

interface Props {
  contents: {
    title: string;
    text: string;
  }[];
}

export default function SearchDataHeader({ contents }: Props) {
  const componets = contents.map((c) => (
    <div key={c.title} className="flex flex-col">
      <div className="text-sm text-slate-500">{c.title}</div>
      <div className="font-semibold text-blue-500">{c.text}</div>
    </div>
  ));

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 bg-slate-50 p-2">
      {componets}
    </div>
  );
}
