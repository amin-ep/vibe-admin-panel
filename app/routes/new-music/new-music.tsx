import React, { useActionState, useEffect, useRef, useState } from "react";
import { getAllArtists } from "~/api/actorApi";
import FormControl from "~/components/FormControl";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/new-music";
import styles from "./new-music.module.css";

import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import axios, { AxiosError, type AxiosResponse } from "axios";
import clsx from "clsx";
import { useFetcher, useNavigate, useRevalidator } from "react-router";
import { toast } from "react-toastify";
import CategoriesController from "~/components/CategoriesController";
import FormErrorText from "~/components/FormErrorText";
import FormLabel from "~/components/FormLabel";
import type { ISelectItem } from "~/components/SelectBox";
import SelectBox from "~/components/SelectBox";
import TrashButton from "~/components/TrashButton";
import {
  API_BASE_URL,
  AUTH_TOKEN_KEY,
  FILE_BASE_URL,
  genresArr,
} from "~/utils/constants";
import { validate } from "~/utils/validate";
import { validateCreateMusic } from "~/validators/music-validators";
import Cookies from "js-cookie";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Music" }];
}

export async function loader({}: Route.LoaderArgs) {
  const artists = await getAllArtists();
  return artists;
}

type CreateMusicState = {
  status: string;
  errors?: { [k: string]: string };
  message?: string;
} | null;

// export async function action({ request }: Route.ActionArgs) {
async function createMusic(
  _prevState: CreateMusicState | null,
  formData: FormData,
) {
  let errors: { [k: string]: string } = {};

  const formDataObj: {
    [k: string]: string | FormDataEntryValue | number | string[];
  } = Object.fromEntries(formData); // this constant is just for validation

  const formDataKeys: string[] = Object.keys(Object.fromEntries(formData));

  // if any field is empty send error
  for (const value of formDataKeys) {
    if (String(formDataObj[value]).length === 0 && value !== "otherArtists") {
      errors[value] = `${value} required!`;
      return { status: "error", errors: errors };
    }
    // if otherArtists field is empty send error
    if (value === "otherArtists" && String(formDataObj[value]).length === 0) {
      delete formDataObj.otherArtists;
      formData.delete(value);
    }
  }

  formDataObj.releaseYear = Number(formDataObj.releaseYear);
  formDataObj.categories = String(formDataObj.categories).split(",");
  // set categories in formData
  formData.delete("categories");
  for (let i = 0; formDataObj.categories.length > i; i++) {
    formData.append(`categories[${i}]`, formDataObj.categories[i]);
  }

  // set otherArtists in formData if exists
  if (formDataObj.otherArtists) {
    if ((formDataObj.otherArtists as string).search(",") < 0) {
      formDataObj.otherArtists = [formDataObj.otherArtists as string];
    } else {
      formDataObj.otherArtists = (formDataObj.otherArtists as string).split(
        ",",
      );
    }
  }

  // validate input data with zod
  const validationErrors = await validate(validateCreateMusic, formDataObj);
  if (validationErrors) {
    return { status: "error", errors: validationErrors };
  }

  try {
    const getArtistsResponse = await getAllArtists();

    // setting id of artist and otherArtists
    if (getArtistsResponse?.status === "success") {
      const selectedArtistId = getArtistsResponse?.data?.find(
        (el) => el.name == formDataObj.artist,
      )?._id;
      formData.delete("artist");
      formData.append("artist", selectedArtistId as string);
      if (formDataObj.otherArtists) {
        let otherArtistsIdArr: string[] = [];
        getArtistsResponse.data?.forEach((el) => {
          if ((formDataObj.otherArtists as string[]).includes(el.name)) {
            otherArtistsIdArr = [...otherArtistsIdArr, el._id];
          }
        });
        formData.delete("otherArtists");
        otherArtistsIdArr.forEach((artistId, index) => {
          formData.append(`otherArtists[${index}]`, artistId);
        });
      }
      const token = Cookies.get(AUTH_TOKEN_KEY);
      const res: AxiosResponse<ICreateMusicResponse> = await axios.post(
        `${API_BASE_URL}/music`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res?.data.status === "success") {
        return {
          status: "success",
          message: "music added successfully",
        };
      }
    }
  } catch (err) {
    const error = err as AxiosError<IApiError>;
    if (error) {
      return {
        status: error?.response?.data.status || "fail",
        message:
          error?.response?.data.message || "something went wrong from server",
      };
    }
  }
}

export default function NewMusic({ loaderData }: Route.ComponentProps) {
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null,
  );
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [artistsArr, setArtistsArr] = useState<ISelectItem[]>([]);

  const [result, formAction, isPending] = useActionState<CreateMusicState>(
    createMusic,
    null,
  );

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (loaderData?.data) {
      let artistsSelectItems: ISelectItem[] = [];
      loaderData?.data.map((el, index) => {
        artistsSelectItems[index] = {
          title: el.name,
          imageUrl: el.imageUrl
            ? `${FILE_BASE_URL}/${el.imageUrl}`
            : "artist-image-placeholder.png",
        };
      });
      setArtistsArr(artistsSelectItems);
    }
  }, [loaderData?.data]);

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

  const onCoverImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].type !== "image/jpeg") {
        toast.error("Invalid image type");
        return;
      }

      setSelectedCoverImage(e.target.files[0]);
    }
  };

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
            <div className={styles["name-controller"]}>
              <FormControl
                name="name"
                id="add-music-name"
                label="Name"
                placeholder="Name"
                type="text"
                error={result?.errors?.name}
              />
            </div>
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
            <div
              className={clsx(
                styles["cover-image-controller"],
                "flex h-full flex-col gap-1.5 md:gap-2",
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
                  "relative flex h-full items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800",
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
                    src={URL.createObjectURL(selectedCoverImage)}
                    className="h-full w-full rounded-md object-cover"
                  />
                )}

                <input
                  type="file"
                  name="coverImageUrl"
                  className="absolute inset-0 w-full opacity-0"
                  onChange={onCoverImageInputChange}
                  accept="image/jpeg"
                />
              </div>
              {result?.errors?.coverImageUrl && (
                <FormErrorText>{result?.errors?.coverImageUrl}</FormErrorText>
              )}
            </div>
            {/* ARTIST */}
            <div
              className={clsx(
                styles["artist-controller"],
                "flex flex-col gap-1.5 md:gap-2",
              )}
            >
              <SelectBox
                placeholder="Artist"
                items={artistsArr}
                searchPlaceholder="Search artist..."
                label="Artist"
                inputName="artist"
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
                placeholder="Other Artists"
                searchPlaceholder="Search artist..."
                label="Other Artists"
                inputName="otherArtists"
                selectMethod="multiple"
              />
            </div>
            {/* RELEASE YEAR */}
            <div
              className={clsx(
                styles["release-year-controller"],
                "flex flex-col gap-1.5 md:gap-2",
              )}
            >
              <FormControl
                id="add-music-release-year"
                label="Release Year"
                name="releaseYear"
                placeholder="Release Year"
                type="number"
                error={result?.errors?.releaseYear}
              />
            </div>
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
          <button
            type="submit"
            className="my-4 rounded-full bg-blue-500 p-3 text-white hover:bg-blue-700"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
