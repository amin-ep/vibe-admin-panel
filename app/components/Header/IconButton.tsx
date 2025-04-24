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
        "text-stone-700 hover:bg-stone-100 hover:text-cyan-600 rounded p-2 focus:ring-cyan-600 ring-white ring-2 dark:text-stone-300 dark:ring-stone-900 dark:hover:bg-stone-800",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
