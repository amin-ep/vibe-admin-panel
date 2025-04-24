import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
  placeholder: string;
  error?: string;
};

export default function FormControl({
  id,
  label,
  name,
  type,
  placeholder,
  error,
}: Props) {
  const [passwordIsHidden, setPasswordIsHidden] = useState(true);
  const isMdWindow = useMediaQuery("(min-width:768px)");

  const eyeIconFontSize = !isMdWindow ? "small" : "medium";

  return (
    <div className="flex flex-col gap-1.5 md:gap-2 relative">
      <label htmlFor={id} className="text-xs md:text-sm text-stone-800">
        {label}
      </label>
      <input
        className="p-2 text-stone-900 text-xs outline-none rounded-lg md:p-3.5 bg-cyan-100/40 ring-2 ring-white focus:ring-cyan-500 transition duration-350"
        type={type === "password" ? (passwordIsHidden ? type : "text") : type}
        name={name}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
      />
      {error && <p className="text-xs text-red-500">*{error}</p>}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setPasswordIsHidden((state) => !state)}
          className="absolute right-2 text-stone-700 top-6 md:top-9 md:right-3.5"
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
