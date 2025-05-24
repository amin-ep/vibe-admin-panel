import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import FormControl from "~/components/FormControl";
import type { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useTransition } from "react";
import { login } from "~/api/authApi";
import { useAuth } from "~/contexts/AuthContext";
import { useToast } from "~/store/useToast";
import { AUTH_TOKEN_KEY, EMAIL_REGEX } from "~/utils/constants";
import type { Route } from "./+types/login";
import LoginHeader from "./components/LoginHeader";
import MovingBallsSection from "./components/MovingBallsSection";
import styles from "./login.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Vibe Admin | Login" }];
}

type FormFields = { identifier: string; password: string };

export default function Login({}: Route.ComponentProps) {
  const [isLoggingIn, startTransition] = useTransition();
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  const { success, error } = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>();

  const onSubmit = (data: FormFields) => {
    const identifier = data.identifier;
    let payload: ILoginPayload = { password: data.password };
    const isEmail = EMAIL_REGEX.test(identifier);

    if (isEmail) {
      payload.email = identifier;
    } else {
      payload.username = identifier;
    }
    startTransition(async () => {
      const response = await login(payload);
      if (response.status === 200) {
        const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        const resData = (response as AxiosResponse<ILoginResponse>).data;
        Cookies.set(AUTH_TOKEN_KEY, resData.token, {
          expires: expires,
        });
        contextLogin(resData.data.user);
        success(`Welcome back ${resData.data.user.firstName}`);
        navigate("/");
      } else {
        const errData = response as AxiosError<IApiError, ILoginResponse>;
        error(errData.response?.data.message || "Something went wrong!");
      }
    });
  };

  return (
    <div className={styles.login}>
      <MovingBallsSection />
      <div className={styles["form-container"]}>
        <LoginHeader />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-10 flex max-w-115 flex-col gap-5 md:mt-14 lg:mt-16"
        >
          <FormControl
            id="identifier"
            label="Email or Username"
            name="identifier"
            placeholder="Enter your email or username"
            type="text"
            error={errors?.identifier?.message}
            register={register}
            registerOptions={{
              required: {
                value: true,
                message: "Email or Username is required",
              },
              validate: (value) => {
                const isEmail = value.includes("@");
                if (isEmail) {
                  return (
                    EMAIL_REGEX.test(value) || "Please input a valid email"
                  );
                } else {
                  if (value.length < 4)
                    return "Username must be at least 4 characters";
                  if (value.length > 30)
                    return "Username must be equal or less than 30 characters";
                }
              },
            }}
          />
          <FormControl
            id="password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            error={errors?.password?.message}
            register={register}
            registerOptions={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              maxLength: {
                value: 14,
                message: "Password must be 14 or less characters",
              },
            }}
          />
          <button
            type="submit"
            className={clsx(
              "relative my-2 cursor-pointer rounded-lg bg-black p-2 text-sm text-white transition duration-300 hover:bg-neutral-800 hover:shadow-2xl disabled:cursor-not-allowed disabled:bg-neutral-800 md:p-3",
              styles.submit,
            )}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
