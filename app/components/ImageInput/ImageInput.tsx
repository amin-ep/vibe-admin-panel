import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import clsx from "clsx";
import React, { useState } from "react";
import { useToast } from "~/store/useToast";
import { FILE_BASE_URL } from "~/utils/constants";
import FormErrorText from "../FormErrorText";
import FormLabel from "../FormLabel";
import TrashButton from "../TrashButton";
import styles from "./ImageInput.module.css";

type Props = {
  name: string;
  errorMessage?: string;
  rounded?: "md" | "full" | "lg" | "sm";
  wrapperClassName?: string;
  defaultImage?: string;
};

function ImageInput({
  name,
  errorMessage,
  rounded = "md",
  wrapperClassName,
  defaultImage,
}: Props) {
  const initializeImageState = () => {
    if (defaultImage) {
      return `${FILE_BASE_URL}/${defaultImage}`;
    } else return null;
  };

  const [selectedCoverImage, setSelectedCoverImage] = useState<
    File | null | string
  >(initializeImageState);

  const { error } = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].type !== "image/jpeg") {
        error("Invalid image type");
        return;
      }

      setSelectedCoverImage(e.target.files[0]);
    }
  };

  return (
    <div
      className={clsx(
        "flex h-full flex-col gap-1.5 md:gap-2",
        wrapperClassName,
      )}
    >
      <div className="flex items-center justify-between">
        <FormLabel label="Cover Image" />
        {selectedCoverImage !== null && (
          <TrashButton onClick={() => setSelectedCoverImage(null)} />
        )}
      </div>

      <div
        className={clsx(
          "relative flex h-full items-center justify-center border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800",
          `rounded-${rounded}`,
        )}
      >
        {selectedCoverImage === null ? (
          <div className="flex items-center justify-center text-neutral-500">
            <InsertPhotoOutlinedIcon
              fontSize="large"
              classes={{
                fontSizeLarge: styles["image-icon"],
              }}
            />
          </div>
        ) : (
          <img
            src={
              typeof selectedCoverImage === "string"
                ? selectedCoverImage
                : URL.createObjectURL(selectedCoverImage as File)
            }
            className={clsx("h-full w-full object-cover", `rounded-${rounded}`)}
          />
        )}

        <input
          type="file"
          name={name}
          className="absolute inset-0 w-full opacity-0"
          onChange={onChange}
          accept="image/*"
        />
      </div>
      {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
    </div>
  );
}

export default ImageInput;
