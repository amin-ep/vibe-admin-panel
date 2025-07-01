import clsx from "clsx";
import styles from "./MovingBallsSection.module.css";
import { motion } from "framer-motion";

function MovingBallsSection() {
  return (
    <motion.div
      initial={{
        x: "-200px",
      }}
      animate={{
        x: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="relative"
    >
      <section className={styles.background}>
        <motion.div
          initial={{
            y: "-20px",
            opacity: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.4,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          className="absolute top-5 left-5 z-10 flex flex-row items-center gap-3 text-xs"
        >
          <p className="uppercase">Not Just Music, It's a Movement</p>
          <hr className="hidden w-30 bg-white lg:block" />
        </motion.div>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <span className={styles.ball}></span>
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.8,
          }}
          className={clsx("absolute bottom-5 left-5 z-10 max-w-100")}
        >
          <p className={styles["background-bottom-headline"]}>
            Manage the Music
          </p>
          <p className={styles["background-bottom-headline"]}>Lead the Vibe</p>
          <p className="mt-5 text-xs">
            You&apos;re not just managing music. you&apos;re shaping the
            experience. Stay in tune, stay ahead.
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default MovingBallsSection;
