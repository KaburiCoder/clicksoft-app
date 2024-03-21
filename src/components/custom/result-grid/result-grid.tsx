import { TitleValueDetail } from "@/sockets/models/title-value-detail";
import { ResultGridBox } from "./result-grid-box";

interface ResultGridProps {
  details: TitleValueDetail[];
}

export function ResultGrid({ details }: ResultGridProps) {
  return (
    <div
      className={`grid-area grid grid-cols-4 bg-white md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 md2:grid-cols-7 lg2:grid-cols-9 xl2:grid-cols-11`}
    >
      {details.map((d, i) => (
        <ResultGridBox key={d.title} {...d} isOdd={i % 2 !== 0} />
      ))}
    </div>
  );
}
