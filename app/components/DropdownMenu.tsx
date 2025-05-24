import clsx from "clsx";
import React from "react";
import { Link } from "react-router";
import { useOutsideClick } from "~/hooks/useOutsideClick";

const btnClasses =
  "text-left cursor-pointer rounded-sm py-1 hover:text-blue-400 hover:pl-2 transition-all duration-300";

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
        "absolute z-1 flex max-w-46 min-w-32 flex-col rounded-md border border-neutral-300 bg-white p-3 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-neutral-800",
        "after:absolute after:-top-1.5 after:-z-1 after:aspect-square after:w-3 after:rotate-45 after:content-around after:rounded-sm after:border-t after:border-l after:border-neutral-300 after:bg-white dark:after:border-neutral-600 dark:after:bg-neutral-800",
        className,
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
        "flex flex-col gap-1 py-2 text-xs text-neutral-600 md:text-sm dark:text-neutral-400",
        className,
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
