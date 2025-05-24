import clsx from "clsx";
import Button from "../Button";
import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router";

type Props = { message: string; details: string; stack?: string };

function Error({ message, details }: Props) {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <div className={styles["moving-balls"]}>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
          <span className={styles.ball}></span>
        </div>
      </div>
      <div className="bg- z-10 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-transparent">
        <h1 className={styles.message}>{message}</h1>
        <p className={clsx("text-center", styles.details)}>{details}</p>
        <button
          className={styles.button}
          onClick={() => {
            navigate(-1);
          }}
        >
          <span>B</span>
          <span>A</span>
          <span>C</span>
          <span>K</span>
        </button>
      </div>
    </div>
  );
}

export default Error;
