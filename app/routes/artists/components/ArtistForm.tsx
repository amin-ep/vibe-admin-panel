import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import type { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useRevalidator } from "react-router";
import { createUpdateArtist } from "~/api/artistApi";
import Button from "~/components/Button";
import FormControl from "~/components/FormControl";
import ImageDropzone from "~/components/ImageDropzone/ImageDropzone";
import { useArtist } from "~/contexts/ArtistContext";
import { useToast } from "~/store/useToast";
import { FILE_BASE_URL } from "~/utils/constants";

type FormFields = CreateArtistPayload & {
  isUpdating: boolean;
  artistId?: string;
} & FieldValues;

function ArtistForm() {
  const [isPending, startTransition] = useTransition();

  const artistImageRef = useRef<HTMLImageElement | null>(null);

  const revalidator = useRevalidator();

  const { isUpdating, artistData, endUpdating } = useArtist();
  const { success, error } = useToast();

  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<FormFields>();

  // setting artistId and isUpdating value while changing state of isUpdating
  useEffect(() => {
    if (isUpdating) {
      reset({
        artistId: artistData?.id,
        isUpdating: isUpdating,
        name: artistData?.name,
      });
    } else {
      reset({
        artistId: "",
        isUpdating: false,
      });
    }
  }, [isUpdating, reset, artistData?.id]);

  // handle upload image change

  const onSubmit = (data: FormFields) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("isUpdating", String(isUpdating));

    if (data.imageUrl) {
      formData.append("imageUrl", data.imageUrl as File);
    }
    if (isUpdating) {
      formData.append("artistId", artistData?.id as string);
    }

    startTransition(async () => {
      const res = await createUpdateArtist(formData);
      const responseError = res as AxiosError<IApiError>;
      const responseSuccess = res as AxiosResponse<
        ICreateDataResponse<IArtist>,
        any
      >;

      if (isUpdating) {
        if (res.status === 200) {
          revalidator.revalidate().then(() => {
            success("Artist updated successfully");
            endUpdating();
          });
        } else {
          error(responseError.response?.data.message || "Something went wrong");
        }
      } else {
        if (res.status === 201) {
          revalidator.revalidate().then(() => {
            console.log(responseSuccess);
            success(
              `${responseSuccess.data.data.document.name} added successfully`,
            );
          });
          reset();
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="artist-form">
      {/* IS UPDATING HIDDEN INPUT */}
      <input type="hidden" {...register("isUpdating")} />

      {/* ARTIST ID HIDDEN INPUT */}
      <input type="hidden" {...register("artistId")} />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-center">
          <ImageDropzone
            wrapperClassName="w-23 sm:w-27 md:w-32 aspect-square"
            name="imageUrl"
            control={control}
            dropzoneClassName="w-full h-full"
            hiddenText
          />
        </div>

        <div className="mx-auto grid grid-cols-1 items-end gap-2.5 md:gap-3">
          {/* ARTIST NAME INPUT */}
          <FormControl
            id="add-artist-name"
            label="Name"
            name="name"
            placeholder="Name"
            type="text"
            error={errors.name?.message}
            register={register}
            registerOptions={{
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 4,
                message: "Name should be at least 4 characters",
              },
              maxLength: {
                value: 30,
                message: "Name must be equal or less than 30 characters",
              },
            }}
          />

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="flex h-8.5 items-center justify-center md:h-11.5"
            disabled={isPending}
          >
            {isPending
              ? isUpdating
                ? "Updating..."
                : "Creating..."
              : "Submit Form"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ArtistForm;
