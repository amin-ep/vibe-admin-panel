import clsx from "clsx";
import React from "react";

type Props = { children: React.ReactNode; className?: string };

function InfoContainer({ children, className }: Props) {
  return (
    <div
      className={clsx(
        className,
        "flex flex-col gap-3 rounded-xl border border-neutral-200 p-3 sm:gap-4 sm:p-4 lg:gap-5 lg:p-5 xl:gap-6 xl:p-6",
      )}
    >
      {children}
    </div>
  );
}

export default InfoContainer;
