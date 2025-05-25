import clsx from "clsx";
import React from "react";
import SpinnerLoader from "./SpinnerLoader/SpinnerLoader";

type Props = {
  children: React.ReactNode;
  variation?: Variation;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button";
  isPending?: boolean;
};

type Variation = "primary" | "secondary";

function Button({
  children,
  onClick,
  className,
  variation = "primary",
  type = "button",
  isPending,
}: Props) {
  const classes: { [k: Variation | string]: string } = {
    primary:
      "bg-blue-400 text-white before:bg-blue-500 hover:shadow-2xl hover:shadow-neutral-950 dark:hover:shadow-neutral-700",
    secondary:
      "bg-neutral-300/80 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-50 dark:before:bg-neutral-900/50 dark:hover:shadow-blue-400/10 before:bg-neutral-50/90 hover:text-blue-400 hover:shadow-xl hover:shadow-blue-300/70",
  };
  return (
    <button
      disabled={isPending}
      className={clsx(
        "relative z-0 rounded-xl text-xs transition hover:scale-[1.05] active:scale-[0.95] md:text-sm",
        classes[variation],
        "before:absolute before:inset-0 before:-z-1 before:w-full before:scale-0 before:content-around before:rounded-xl before:transition before:duration-300 hover:before:scale-[1]",
        className,
        !isPending ? "p-3" : "p-2.5",
      )}
      onClick={onClick}
      type={type}
    >
      {isPending ? <SpinnerLoader color="white" /> : children}
    </button>
  );
}

export default Button;
