import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  variation?: Variation;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
};

type Variation = "primary" | "secondary";

function Button({
  children,
  onClick,
  className,
  variation = "primary",
  type = "button",
  disabled,
}: Props) {
  const classes: { [k: Variation | string]: string } = {
    primary: "bg-blue-500 text-white before:bg-blue-800",
    secondary: "bg-rose-500 text-white before:bg-rose-700",
  };
  return (
    <button
      disabled={disabled}
      className={clsx(
        "relative z-0 rounded-xl p-3 text-xs transition hover:scale-[1.05] active:scale-[0.95] md:text-sm",
        classes[variation],
        "before:absolute before:inset-0 before:-z-1 before:w-full before:scale-0 before:content-around before:rounded-xl before:transition before:duration-300 hover:before:scale-[1]",
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
