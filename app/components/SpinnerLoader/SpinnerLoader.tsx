import clsx from "clsx";
import styles from "./SpinnerLoader.module.css";

function SpinnerLoader({ color = "blue" }: { color?: "white" | "blue" }) {
  return <div className={clsx(styles.loader, styles[color])}></div>;
}

export default SpinnerLoader;
