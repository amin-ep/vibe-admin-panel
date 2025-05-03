import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { useActionState, useEffect, useState } from "react";
import { useRevalidator } from "react-router";
import { toast } from "react-toastify";
import { createArtist } from "~/api/actorApi";
import Button from "~/components/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FormControl from "~/components/FormControl";

type Props = {};

function AddArtistForm({}: Props) {
  const [result, formAction, isPending] =
    // @ts-ignore
    useActionState<CreateDataState>(createArtist, null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const revalidator = useRevalidator();

  const imageUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (result?.status === "success") {
      toast.success("The new artist added successfully");
      revalidator.revalidate();
      setSelectedImage(null);
    }
  }, [result]);

  return (
    <div>
      <form action={formAction}>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-23 rounded-full border border-neutral-300 bg-neutral-100 sm:w-27 md:w-32 dark:border-neutral-700 dark:bg-neutral-800">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt={selectedImage.name}
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
            />
            <Button
              type="submit"
              className="flex h-8.5 items-center justify-center md:h-11.5"
            >
              Create Artist
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddArtistForm;
