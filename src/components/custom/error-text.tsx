import React from "react";

interface Props {
  errorMessage?: string;
}
export default function ErrorText({ errorMessage }: Props) {
  if (!errorMessage) return <></>;

  return (
    <div className="text-error border-error rounded border bg-red-50 p-2 text-sm">
      {errorMessage}
    </div>
  );
}
