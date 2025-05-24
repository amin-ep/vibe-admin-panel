import { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import styles from "./ImageDropzone.module.css";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import clsx from "clsx";
import FormLabel from "../FormLabel";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import FormErrorText from "../FormErrorText";
import { FILE_BASE_URL } from "~/utils/constants";

type Props<T extends FieldValues> = {
  dropzoneClassName?: string;
  name: Path<T>;
  label?: string;
  control: Control<T>;
  wrapperClassName?: string;
  hiddenText?: boolean;
  errorMessage?: string;
  rules: RegisterOptions<T>;
  defaultSrc?: string;
};

function ImageDropzone<T extends FieldValues>({
  dropzoneClassName,
  name,
  label,
  control,
  wrapperClassName,
  errorMessage,
  hiddenText = false,
  rules,
  defaultSrc,
}: Props<T>) {
  const [file, setFile] = useState<File | null | string>(defaultSrc ?? null);

  const onDrop = useCallback(
    (acceptedFiles: any, field: ControllerRenderProps<T>) => {
      field.onChange(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    },
    [],
  );

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field }) => {
        const { getInputProps, getRootProps, isDragActive, acceptedFiles } =
          useDropzone({
            onDrop: (acceptedFiles) => onDrop(acceptedFiles, field),
            maxFiles: 1,
            accept: { "image/*": [] },
          });

        return (
          <div
            className={clsx(
              "flex h-full flex-col gap-1.5 md:gap-2.5",
              wrapperClassName,
            )}
          >
            {label && <FormLabel label={label} />}
            {file ? (
              <div className="relative">
                <button
                  onClick={() => {
                    field.onChange(null);
                    setFile(null);
                  }}
                  className="absolute -top-3 -right-3 z-1 aspect-square w-8 rounded-full bg-rose-500 hover:bg-rose-700 md:w-9"
                  type="button"
                >
                  <ClearRoundedIcon />
                </button>
                <img
                  className="rounded-md"
                  src={
                    file instanceof File
                      ? URL.createObjectURL(file as File)
                      : `${FILE_BASE_URL}/${file}`
                  }
                  alt="cover image"
                />
              </div>
            ) : (
              <div
                className={clsx(
                  "relative flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-neutral-300 bg-neutral-200 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800",
                  "after:absolute after:inset-1.5 after:z-1 after:rounded-md after:border after:border-dashed after:border-neutral-500 md:after:inset-2.5 dark:after:border-neutral-600",
                  dropzoneClassName,
                )}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <span>
                    <CloudUploadRoundedIcon
                      classes={{
                        root: styles.icon,
                      }}
                      className={styles["dragging-icon"]}
                    />
                  </span>
                ) : (
                  <span className="flex flex-col items-center">
                    <AddPhotoAlternateOutlinedIcon
                      classes={{
                        root: styles.icon,
                      }}
                    />
                    {!hiddenText && (
                      <p className={clsx("hidden text-xs italic sm:block")}>
                        Click or Drag & Drop
                      </p>
                    )}
                  </span>
                )}
              </div>
            )}
            {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
          </div>
        );
      }}
    />
  );
}

export default ImageDropzone;
