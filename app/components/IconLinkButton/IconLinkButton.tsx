import clsx from "clsx";
import React from "react";
import { Link } from "react-router";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variation?: "button" | "link";
  theme?: "primary" | "secondary" | "transparent";
  to?: string;
};

function IconLinkButton({
  children,
  onClick,
  className,
  variation = "button",
  theme = "transparent",
  to,
}: Props) {
  const themeStyles: { [k: string]: string } = {
    transparent:
      "text-neutral-700 bg-transparent ring-white hover:bg-neutral-100 hover:text-blue-600 focus:ring-blue-500 dark:text-neutral-300 dark:ring-neutral-900 hover:dark:bg-neutral-800",
    primary:
      "text-white ring-blue-600 ring-blue-600 hover:bg-blue-800 focus:ring-blue-800 bg-blue-600 hover:ring-blue-800",
    secondary:
      "text-white ring-rose-600 hover:bg-rose-800 focus:ring-rose-800 bg-rose-600 hover:ring-rose-800",
  };

  const classes = clsx(
    "rounded-full p-2 ring-2",
    className,
    themeStyles[theme as string],
  );

  if (variation === "button")
    return (
      <button onClick={onClick} type="button" className={classes}>
        {children}
      </button>
    );
  else
    return (
      <Link to={to as string} className={classes}>
        {children}
      </Link>
    );
}

export default IconLinkButton;
