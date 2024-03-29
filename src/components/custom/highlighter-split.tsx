import React from "react";
import Highlighter from "react-highlight-words";

interface Props {
  searchString: string | undefined;
  textToHighlight: string;
}
export default function HighlighterSplit({
  searchString,
  textToHighlight,
}: Props) {
  if (!searchString) return <>{textToHighlight}</>;

  const searchWords = searchString.split(" ");
  return (
    <Highlighter
      highlightClassName="text-white bg-rose-400"
      searchWords={searchWords}
      autoEscape={true}
      textToHighlight={textToHighlight}
    />
  );
}
