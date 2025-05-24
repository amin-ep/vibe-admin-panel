import clsx from "clsx";
import styles from "./LoginHeader.module.css";

type Props = {};

function LoginHeader({}: Props) {
  return (
    <header>
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt="logo" className="w-16" />
      </div>
      <div className="pt-8 text-center sm:pt-10 md:pt-20">
        <h1 className={clsx(styles.heading, "text-neutral-950")}>
          Welcome Back
        </h1>
        <span className="text-sm leading-1 text-neutral-950">
          Enter your email or username and password to access your account
        </span>
      </div>
    </header>
  );
}

export default LoginHeader;
