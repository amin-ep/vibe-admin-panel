import clsx from "clsx";
import React from "react";

type Props = { children: React.ReactNode; className?: string };

function BorderedWrapper({ children, className }: Props) {
  return (
    <div
      className={clsx(
        className,
        "rounded-lg border border-neutral-200 dark:border-neutral-800",
      )}
    >
      {children}
    </div>
  );
}

export default BorderedWrapper;
