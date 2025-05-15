import clsx from "clsx";
import React from "react";

type Props = {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  iconClassName: string;

  className: string;
};

function StatsCard({ count, title, icon, className, iconClassName }: Props) {
  return (
    <div
      className={clsx(
        className,
        "grid grid-cols-[40px_1fr] gap-1 rounded-lg border p-2 sm:grid-cols-[50px_1fr] sm:gap-2 sm:p-3 md:gap-3 lg:gap-4",
      )}
    >
      <span
        className={clsx(
          iconClassName,
          "flex aspect-square items-center justify-center rounded-full",
        )}
      >
        {icon}
      </span>
      <div
        className={clsx(
          "flex items-center gap-1 text-xs md:text-base lg:text-lg xl:text-xl",
        )}
      >
        <p>{count}</p>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default StatsCard;
