import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import FormLabel from "../FormLabel";
import { useCallback, useEffect, useState } from "react";
import FieldsAudioPlayer from "./FieldsAudioPlayer";
import FormErrorText from "../FormErrorText";
import { useToast } from "~/store/useToast";

type Props<T extends FieldValues> = {
  control: Control<T>;
  dropzoneClassName?: string;
  wrapperClassName?: string;
  errorMessage?: string;
  rules: RegisterOptions<T>;
  defaultSrc?: string;
};

function AudioDropzone<T extends FieldValues>({
  control,
  dropzoneClassName,
  rules,
  errorMessage,
  wrapperClassName,
  defaultSrc,
}: Props<T>) {
  const [file, setFile] = useState<File | null | string>(defaultSrc ?? null);
  const { error } = useToast();
  const onDrop = useCallback(
    (acceptedFiles: any, field: ControllerRenderProps<T>) => {
      field.onChange(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    },
    [],
  );

  const onDropRejected = () => {
    error("Invalid audio type");
  };

  return (
    <Controller
      name={"audioFileUrl" as Path<T>}
      control={control}
      rules={rules}
      render={({ field }) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop: (acceptedFiles) => onDrop(acceptedFiles, field),
          maxFiles: 1,
          accept: {
            "audio/*": [".mp3", ".wav", ".ogg"],
          },
          onDropRejected,
        });

        return (
          <div
            className={clsx(
              "md:gap2 flex w-full flex-col gap-1.5",
              wrapperClassName,
            )}
          >
            <FormLabel label="Audio File" />
            {file ? (
              <div>
                <FieldsAudioPlayer
                  onDelete={() => {
                    setFile(null);
                    field.onChange(null);
                  }}
                  audioSrc={file}
                />
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={clsx(
                  "relative flex w-full cursor-pointer items-center justify-center rounded-md border border-neutral-300 bg-neutral-200 p-2 text-neutral-500 md:p-3.5 dark:border-neutral-700 dark:bg-neutral-800",
                  "after:absolute after:inset-0.25 after:z-1 after:rounded-md after:border after:border-dashed after:border-neutral-500 md:after:inset-0.5 dark:after:border-neutral-600",
                  dropzoneClassName,
                )}
              >
                <span>{isDragActive ? "Dragging..." : "Drag"}</span>
                <input {...getInputProps()} />
              </div>
            )}
            {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
          </div>
        );
      }}
    ></Controller>
  );
}

export default AudioDropzone;
