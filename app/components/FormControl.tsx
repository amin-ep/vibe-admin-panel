import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import FormLabel from "./FormLabel";

type Props = {
  label?: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  id?: string;
  placeholder: string;
  error?: string;
  defaultValue?: string;
  controllerClassName?: string;
  inputClassName?: string;
  value?: string | FormDataEntryValue;
};

export default function FormControl({
  id,
  label,
  name,
  type,
  placeholder,
  error,
  defaultValue,
  controllerClassName,
  inputClassName,
  value,
}: Props) {
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
          "rounded-lg border border-neutral-200 p-2 text-xs text-neutral-900 ring-4 ring-white transition duration-350 outline-none focus:border-blue-500 focus:ring-blue-200 md:p-3.5 dark:border-neutral-700 dark:text-neutral-200 dark:ring-neutral-900 dark:placeholder:text-neutral-700 dark:focus:border-blue-700 dark:focus:ring-blue-950",
          inputClassName,
        )}
        type={type === "password" ? (passwordIsHidden ? type : "text") : type}
        name={name}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        {...(type === "number" && {
          min: 1900,
          max: currentYear,
        })}
        defaultValue={(value as string) || (defaultValue as string)}
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
