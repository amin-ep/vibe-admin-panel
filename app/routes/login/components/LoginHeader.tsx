import clsx from "clsx";
import styles from "./LoginHeader.module.css";
import { motion } from "framer-motion";

type Props = {};

function LoginHeader({}: Props) {
  return (
    <header>
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt="logo" className="w-16" />
      </div>
      <div className="pt-8 text-center sm:pt-10 md:pt-20">
        <motion.h1
          initial={{ y: "-10px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.4,
          }}
          className={clsx(styles.heading, "text-neutral-950")}
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ y: "-10px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.4,
          }}
          className="text-sm leading-1 text-neutral-950"
        >
          Enter your email or username and password to access your account
        </motion.p>
      </div>
    </header>
  );
}

export default LoginHeader;
