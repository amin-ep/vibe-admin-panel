import clsx from "clsx";
import styles from "./Overlay.module.css";

type Props = {
  className?: string;
  isOpen: boolean;
  close?: () => void;
  id?: string;
};

export default function Overlay({ className, isOpen, close, id }: Props) {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-11 h-screen w-full bg-transparent backdrop-blur-md transition",
        className,
        isOpen ? styles.open : styles.close,
      )}
      {...(close && { onClick: close })}
      id={id}
    ></div>
  );
}
