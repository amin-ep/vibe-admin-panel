import React from "react";

type Props = { children: React.ReactNode };

function FormErrorText({ children }: Props) {
  return <p className="text-xs text-red-500">*{children}</p>;
}

export default FormErrorText;
