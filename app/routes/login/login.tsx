import clsx from "clsx";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login } from "~/api/authApi";
import FormControl from "~/components/FormControl";
import { useAuth } from "~/context/AuthContext";
import { AUTH_TOKEN_KEY } from "~/utils/constants";
import { validate } from "~/utils/validate";
import {
  loginValidatorWithEmail,
  loginValidatorWithUsername,
} from "~/validators/auth-validators";
import type { Route } from "./+types/login";
import MovingBallsSection from "./components/MovingBallsSection";
import styles from "./login.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Vibe Admin | Login" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const identifier = (formData.get("identifier") as string) || "";
  const password = (formData.get("password") as string) || "";

  let payload: ILoginPayload = { password: password as string };

  if (identifier.trim().length === 0) {
    return {
      status: "error",
      errors: { identifier: "Please input email or username" },
    };
  }

  if (identifier.includes("@")) {
    payload.email = identifier;
    const errors = await validate<ILoginPayload>(
      loginValidatorWithEmail,
      payload,
    );

    if (errors) {
      return { status: "fail", errors: errors };
    }
  } else {
    payload.username = identifier;
    const errors = await validate<ILoginPayload>(
      loginValidatorWithUsername,
      payload,
    );

    if (errors) {
      return { status: "fail", errors: errors };
    }
  }

  const res = await login(payload);
  return res;
}

export default function Login({}: Route.ComponentProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const fetcher = useFetcher<IFetcherResponse>();

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.status === "fail") {
        toast.error(fetcher.data.message);
      }

      if (fetcher.data.status === "success") {
        const user = fetcher.data.data?.data.user;
        login(user as IUser);
        const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        Cookies.set(
          AUTH_TOKEN_KEY as string,
          fetcher.data.data?.token as string,
          {
            expires,
            secure: true,
          },
        );
        toast.success(`Welcome back ${user?.firstName ?? user?.username}`);
        navigate("/");
      }
    }
  }, [fetcher.data]);

  return (
    <div className={styles.login}>
      <MovingBallsSection />
      <div className={styles["form-container"]}>
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
        <fetcher.Form
          className="mx-auto mt-10 flex max-w-115 flex-col gap-5 md:mt-14 lg:mt-16"
          method="post"
        >
          <FormControl
            id="identifier"
            label="Email or Username"
            name="identifier"
            placeholder="Enter your email or username"
            type="text"
            error={fetcher.data?.errors?.identifier}
          />
          <FormControl
            id="password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            error={fetcher.data?.errors?.password}
          />
          <button
            type="submit"
            className={clsx(
              "relative my-2 cursor-pointer rounded-lg bg-black p-2 text-sm text-white transition duration-300 hover:bg-neutral-800 hover:shadow-2xl md:p-3",
              styles.submit,
            )}
          >
            {fetcher.state === "submitting" ? "Loading..." : "Sign In"}
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
