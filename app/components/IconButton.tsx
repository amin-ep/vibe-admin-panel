import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

function IconButton({ children, onClick, className }: Props) {
  return (
    <button
      type="button"
      className={clsx(
        "bing-2 rounded-full p-2 text-neutral-700 ring-white hover:bg-neutral-100 hover:text-blue-600 focus:ring-blue-600 dark:text-neutral-300 dark:ring-neutral-900 dark:hover:bg-neutral-800",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
