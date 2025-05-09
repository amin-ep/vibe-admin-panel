import ApiRequests from "~/api";
import Button from "~/components/Button";
import CategoriesController from "~/components/CategoriesController";
import FormControl from "~/components/FormControl";
import ImageInput from "~/components/ImageInput/ImageInput";
import PageHeading from "~/components/PageHeading";
import SelectBox from "~/components/SelectBox";
import { useSelectBoxArray } from "~/hooks/useSelectBoxArray";
import type { Route } from "./+types/new-album";
import styles from "./new-album.module.css";
import { useActionState, useEffect } from "react";
import { createAlbum } from "~/api/albumApi";
import { useNavigate, useRevalidator } from "react-router";
import { toast } from "react-toastify";

export function meta() {
  return [{ title: "New Album" }];
}

export async function loader({}: Route.LoaderArgs) {
  const api = new ApiRequests();
  const artists = await api.getAllData<IArtist>("artist");
  const musics = await api.getAllData<IMusic>("music");
  return {
    artists: artists?.data,
    musics: musics?.data,
  };
}

function NewAlbum({ loaderData }: Route.ComponentProps) {
  // @ts-ignore
  const [result, formAction, isPending] = useActionState(createAlbum, null);
  const artistsArr = useSelectBoxArray(loaderData?.artists as IArtist[]);
  const musicsArr = useSelectBoxArray(loaderData?.musics as IMusic[]);

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        revalidator.revalidate();
        toast.success(result.message);
        navigate("/albums");
      }
      if (result?.status === "fail" && result.message) {
        toast.error(result.message);
      }
    }
  }, [result]);

  return (
    <div>
      <PageHeading title="Add New Album" />
      <form action={formAction}>
        <div className={styles["grid-container"]}>
          <FormControl
            id="add-album-name"
            label="Name"
            name="name"
            placeholder="Album name..."
            type="text"
            controllerClassName={styles["name-controller"]}
            error={result?.errors?.name}
          />
          <ImageInput
            name="coverImageUrl"
            rounded="md"
            wrapperClassName={styles["cover-image-controller"]}
            errorMessage={result?.errors?.coverImageUrl}
          />
          <SelectBox
            inputName="artist"
            placeholder="Artist"
            label="Artist"
            items={artistsArr}
            searchPlaceholder="Search artists..."
            wrapperClassName={styles["artist-controller"]}
            errorMessage={result?.errors?.artist}
          />
          <FormControl
            id="add-album-release-year"
            label="Release Year"
            name="releaseYear"
            placeholder="Release Year"
            type="number"
            error={result?.errors?.releaseYear}
            controllerClassName={styles["release-year-controller"]}
          />
          <SelectBox
            items={artistsArr}
            inputName="otherArtists"
            selectMethod="multiple"
            label="Other Artists"
            placeholder="Other Artists"
            searchPlaceholder="Search artists..."
            wrapperClassName={styles["other-artists-controller"]}
            errorMessage={result?.errors?.otherArtists}
          />
          <SelectBox
            inputName="musics"
            items={musicsArr}
            placeholder="Musics"
            searchPlaceholder="Search music..."
            label="Musics"
            selectMethod="multiple"
            wrapperClassName={styles["music-controller"]}
            errorMessage={result?.errors?.musics}
          />
          <CategoriesController
            wrapperClassName={styles["categories-controller"]}
            errorMessage={result?.errors?.categories}
          />
        </div>
        <Button type="submit" className="my-10 w-35">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default NewAlbum;
