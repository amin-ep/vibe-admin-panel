import clsx from "clsx";
import styles from "./MovingBallsSection.module.css";

function MovingBallsSection() {
  return (
    <div className="relative">
      <section className={styles.background}>
        <div className="absolute top-5 text-xs left-5 z-10 flex flex-row items-center gap-3">
          <p className="uppercase">Not Just Music, It's a Movement</p>
          <hr className="bg-white w-30 lg:block hidden" />
        </div>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <div className={clsx("absolute z-10 bottom-5 left-5 max-w-100")}>
          <p className={styles["background-bottom-headline"]}>
            Manage the Music
          </p>
          <p className={styles["background-bottom-headline"]}>Lead the Vibe</p>
          <p className="text-xs mt-5">
            You&apos;re not just managing music. you&apos;re shaping the
            experience. Stay in tune, stay ahead.
          </p>
        </div>
      </section>
    </div>
  );
}

export default MovingBallsSection;
