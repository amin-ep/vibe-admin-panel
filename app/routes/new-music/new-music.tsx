import React, { useActionState, useEffect, useState } from "react";
import { getAllArtists } from "~/api/artistApi";
import FormControl from "~/components/FormControl";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/new-music";
import styles from "./new-music.module.css";

import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import clsx from "clsx";
import { useNavigate, useRevalidator } from "react-router";
import { toast } from "react-toastify";
import { createMusic } from "~/api/musicApi";
import Button from "~/components/Button";
import CategoriesController from "~/components/CategoriesController";
import FormErrorText from "~/components/FormErrorText";
import FormLabel from "~/components/FormLabel";
import SelectBox from "~/components/SelectBox";
import TrashButton from "~/components/TrashButton";
import { useSelectBoxArray } from "~/hooks/useSelectBoxArray";
import { genresArr } from "~/utils/constants";
import ImageInput from "~/components/ImageInput/ImageInput";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Music" }];
}

export async function loader({}: Route.LoaderArgs) {
  const artists = await getAllArtists();
  return artists;
}

export default function NewMusic({ loaderData }: Route.ComponentProps) {
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);

  const [result, formAction, isPending] = useActionState<CreateDataState>(
    //@ts-ignore
    createMusic,
    null,
  );

  const artistsArr = useSelectBoxArray(loaderData?.data as IArtist[]);

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        revalidator.revalidate();
        toast.success(result.message);
        navigate("/musics");
      }
      if (result?.status === "fail" && result.message) {
        toast.error(result.message);
      }
    }
  }, [revalidator, result]);

  const onAudioUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].type !== "audio/mpeg") {
        toast.error("Invalid audio file!");
        return;
      }
      setSelectedAudio(e.target.files[0]);
    }
  };

  return (
    <div>
      <PageHeading title="Add Music" />
      <div>
        <form action={formAction}>
          <div className={styles["grid-container"]}>
            {/* NAME */}

            <FormControl
              name="name"
              id="add-music-name"
              label="Name"
              placeholder="Name"
              type="text"
              error={result?.errors?.name}
              controllerClassName={styles["name-controller"]}
            />

            {/* AUDIO */}
            <div
              className={clsx(
                styles["audio-controller"],
                "relative flex flex-col gap-1.5 md:gap-2",
              )}
            >
              <div className="flex flex-row items-center justify-between">
                <FormLabel label="Audio File" />
                {selectedAudio && (
                  <TrashButton onClick={() => setSelectedAudio(null)} />
                )}
              </div>

              <div
                className={clsx(
                  "relative flex items-center justify-center gap-1.5 rounded-md text-xs text-neutral-500 md:text-sm dark:border-neutral-700 dark:bg-neutral-900",
                  !selectedAudio &&
                    "border border-neutral-300 bg-neutral-100 py-1 md:py-3",
                )}
              >
                {!selectedAudio ? (
                  <>
                    <span>Click To Upload</span>
                    <AudioFileRoundedIcon />
                  </>
                ) : (
                  <audio
                    className="w-full"
                    src={URL.createObjectURL(selectedAudio)}
                    controls
                    controlsList="nodownload"
                  />
                )}
                <input
                  type="file"
                  name="audioFileUrl"
                  className="absolute z-1 opacity-0"
                  onChange={onAudioUrlInputChange}
                />{" "}
              </div>
              {result?.errors?.audioFileUrl && (
                <FormErrorText>{result?.errors?.audioFileUrl}</FormErrorText>
              )}
            </div>
            {/* COVER IMAGE */}

            <ImageInput
              errorMessage={result?.errors?.coverImageUrl}
              name="coverImageUrl"
              rounded="md"
              wrapperClassName={clsx(
                styles["cover-image-controller"],
                "h-full",
              )}
            />

            {/* ARTIST */}
            <div
              className={clsx(
                styles["artist-controller"],
                "flex flex-col gap-1.5 md:gap-2",
              )}
            >
              <SelectBox
                inputName="artist"
                placeholder="Artist"
                label="Artist"
                items={artistsArr}
                searchPlaceholder="Search artist..."
              />
              {result?.errors?.artist && (
                <FormErrorText>{result?.errors?.artist}</FormErrorText>
              )}
            </div>
            {/* OTHER ARTISTS */}
            <div
              className={clsx(
                styles["other-artists-controller"],
                "flex flex-col gap-1.5 md:gap-2",
              )}
            >
              <SelectBox
                items={artistsArr}
                inputName="otherArtists"
                selectMethod="multiple"
                label="Other Artists"
                placeholder="Other Artists"
                searchPlaceholder="Search artists..."
              />
            </div>
            {/* RELEASE YEAR */}

            <FormControl
              id="add-music-release-year"
              label="Release Year"
              name="releaseYear"
              placeholder="Release Year"
              type="number"
              error={result?.errors?.releaseYear}
              controllerClassName={styles["release-year-controller"]}
            />

            {/* GENRE */}
            <div
              className={clsx(
                styles["genre-controller"],
                "flex flex-col gap-1.5 md:gap-2",
              )}
            >
              <SelectBox
                items={genresArr}
                placeholder="Choose a Genre"
                label="Genre"
                searchPlaceholder="Search genre..."
                inputName="genre"
              />
              {result?.errors?.genre && (
                <FormErrorText>{result?.errors.genre}</FormErrorText>
              )}
            </div>
            {/* CATEGORIES */}
            <div
              className={clsx(
                styles["categories-controller"],
                "flex flex-col gap-1.5 md:gap-2",
              )}
            >
              <CategoriesController />
              {result?.errors?.categories && (
                <FormErrorText>{result?.errors?.categories}</FormErrorText>
              )}
            </div>
          </div>
          <Button type="submit" className="my-10 w-38">
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
}
