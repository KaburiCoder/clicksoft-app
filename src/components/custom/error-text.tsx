import React from "react";

interface Props {
  errorMessage?: string;
  errorMessages?: string[];
}

export default function ErrorText({ errorMessage, errorMessages }: Props) {
  errorMessage = errorMessage || errorMessages?.join("\n");
  if (!errorMessage) return <></>;

  return (
    <div className="rounded border border-error bg-red-50 p-2 text-sm text-error">
      {errorMessage}
    </div>
  );
}
