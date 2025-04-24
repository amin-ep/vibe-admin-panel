import clsx from "clsx";
import React from "react";
import { Link } from "react-router";
import { useOutsideClick } from "~/hooks/useOutsideClick";

const btnClasses =
  "text-left cursor-pointer rounded-sm py-1 hover:text-cyan-500 hover:pl-2 transition-all duration-300";

function DropdownMenu({
  children,
  className,
  close,
}: {
  children: React.ReactNode;
  className?: string;
  close: () => void;
}) {
  const ref = useOutsideClick(close);
  return (
    <div
      className={clsx(
        "bg-white dark:bg-stone-800 flex flex-col shadow-md dark:shadow-stone-800 z-1 border min-w-32 max-w-46 border-stone-300 dark:border-stone-600 rounded-md p-3 absolute",
        "after:bg-white dark:after:bg-stone-800 after:-top-1.5 after:absolute after:content-around after:rounded-sm after:rotate-45 after:border-l after:border-t after:border-stone-300 dark:after:border-stone-600 after:-z-1 after:w-3 after:aspect-square",
        className
      )}
      ref={ref as React.RefObject<HTMLDivElement | null>}
    >
      {children}
    </div>
  );
}

function Row({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 text-stone-600 dark:text-stone-400 text-xs md:text-sm py-2",
        className
      )}
    >
      {children}
    </div>
  );
}

function RowSpan({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={className}>{children}</span>;
}

function RowButton({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={clsx(className, btnClasses)}>
      {children}
    </button>
  );
}

function RowLink({
  className,
  children,
  to,
}: {
  className?: string;
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Link className={clsx(className, btnClasses)} to={to}>
      {children}
    </Link>
  );
}

DropdownMenu.Row = Row;
DropdownMenu.RowButton = RowButton;
DropdownMenu.RowSpan = RowSpan;
DropdownMenu.RowLink = RowLink;

export default DropdownMenu;
