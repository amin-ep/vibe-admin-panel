import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { useActionState, useEffect, useRef, useState } from "react";
import { useRevalidator } from "react-router";
import { createUpdateArtist } from "~/api/artistApi";
import Button from "~/components/Button";
import FormControl from "~/components/FormControl";
import { useArtist } from "~/contexts/ArtistContext";
import { useToast } from "~/store/useToast";
import { FILE_BASE_URL } from "~/utils/constants";

type Props = {};

function ArtistForm({}: Props) {
  const { isUpdating, artistData, endUpdating } = useArtist();

  const { success, error } = useToast();

  const [result, formAction, isPending] = useActionState<CreateDataState>(
    // @ts-ignore
    createUpdateArtist,
    null,
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const revalidator = useRevalidator();

  const imageUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (result?.status === "success") {
      if (!isUpdating) {
        success("The new artist added successfully");
        setSelectedImage(null);
      } else {
        success("Artist data updated successfully");
        endUpdating();
      }
      revalidator.revalidate();
    } else {
      error(result?.message || "Something went wrong!");
    }
  }, [result]);

  return (
    <form action={formAction} id="artist-form">
      <input type="hidden" name="isUpdating" value={String(isUpdating)} />
      <input type="hidden" name="artistId" value={artistData?.id} />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-23 rounded-full border border-neutral-300 bg-neutral-100 sm:w-27 md:w-32 dark:border-neutral-700 dark:bg-neutral-800">
            {selectedImage || artistData?.imageUrl ? (
              <img
                src={
                  artistData?.imageUrl
                    ? `${FILE_BASE_URL}/${artistData.imageUrl}`
                    : URL.createObjectURL(selectedImage!)
                }
                alt={selectedImage?.name || ""}
                className="aspect-square w-full rounded-full object-cover"
              />
            ) : (
              <span className="flex aspect-square w-full items-center justify-center rounded-full text-neutral-500">
                <InsertPhotoOutlinedIcon fontSize="large" />
              </span>
            )}
            <input
              type="file"
              name="imageUrl"
              id="add-artist-image"
              className="absolute inset-0 aspect-square rounded-full opacity-0"
              onChange={imageUrlInputChange}
              ref={fileInputRef}
            />
            {selectedImage && (
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -bottom-3 aspect-square w-10 rounded-full bg-rose-600 text-white hover:bg-rose-800 sm:-bottom-1.5 md:bottom-0"
              >
                <DeleteRoundedIcon />
              </button>
            )}
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 items-end gap-2.5 md:gap-3">
          <FormControl
            id="add-artist-name"
            label="Name"
            name="name"
            placeholder="Name"
            type="text"
            error={result?.errors?.name}
            defaultValue={artistData?.name}
          />
          <Button
            type="submit"
            className="flex h-8.5 items-center justify-center md:h-11.5"
          >
            {/* Submit Form */}
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
