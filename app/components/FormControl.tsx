import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import type { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import FormLabel from "./FormLabel";

type Props<TFormValues extends FormValues> = {
  label?: string;
  type: React.HTMLInputTypeAttribute;
  name: Path<TFormValues>;
  placeholder: string;
  error?: string;
  controllerClassName?: string;
  inputClassName?: string;
  id?: string;
  register: UseFormRegister<TFormValues>;
  registerOptions: RegisterOptions<TFormValues, Path<TFormValues>> | undefined;
};

export default function FormControl<TFormValues extends FormValues>({
  id,
  label,
  name,
  type,
  placeholder,
  error,
  controllerClassName,
  inputClassName,
  register,
  registerOptions,
}: Props<TFormValues>) {
  const [passwordIsHidden, setPasswordIsHidden] = useState(true);

  const isMdWindow = useMediaQuery("(min-width:768px)");
  const eyeIconFontSize = !isMdWindow ? "small" : "medium";

  const currentYear = new Date().getFullYear();

  return (
    <div
      className={clsx(
        "relative flex flex-col gap-1.5 md:gap-2",
        controllerClassName,
      )}
    >
      {label && <FormLabel htmlFor={id} label={label} />}
      <input
        className={clsx(
          "rounded-lg border border-neutral-200 p-2 text-xs text-neutral-900 ring-4 ring-white transition duration-350 outline-none focus:border-blue-400 focus:ring-blue-200 md:p-3.5 dark:border-neutral-700 dark:text-neutral-200 dark:ring-neutral-900 dark:placeholder:text-neutral-700 dark:focus:border-blue-700 dark:focus:ring-blue-950",
          inputClassName,
        )}
        type={type === "password" ? (passwordIsHidden ? type : "text") : type}
        {...register(name, registerOptions)}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        {...(type === "number" && {
          min: 1900,
          max: currentYear,
        })}
      />

      {error && <p className="text-xs text-red-500">*{error}</p>}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setPasswordIsHidden((state) => !state)}
          className="absolute top-6 right-2 text-neutral-700 md:top-9 md:right-3.5"
        >
          {passwordIsHidden ? (
            <VisibilityOutlinedIcon fontSize={eyeIconFontSize} />
          ) : (
            <VisibilityOffOutlinedIcon fontSize={eyeIconFontSize} />
          )}
        </button>
      )}
    </div>
  );
}
