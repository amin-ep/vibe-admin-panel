import ApiRequests from "~/api";
import FormControl from "~/components/FormControl";
import PageHeading from "~/components/PageHeading";
import SelectBox from "~/components/SelectBox";
import { useSelectBoxArray } from "~/hooks/useSelectBoxArray";
import type { Route } from "./+types/new-album";
import CategoriesController from "~/components/CategoriesController";
import ImageInput from "~/components/ImageInput/ImageInput";
import { useFetcher } from "react-router";

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
  const artistsArr = useSelectBoxArray(loaderData?.artists as IArtist[]);
  const musicsArr = useSelectBoxArray(loaderData?.musics as IMusic[]);

  const fetcher = useFetcher();
  return (
    <div>
      <PageHeading title="Add New Album" />
      <fetcher.Form method="POST">
        <div className="flex flex-col gap-4">
          <FormControl
            id="add-album-name"
            label="Name"
            name="name"
            placeholder="Album name..."
            type="text"
          />
          <SelectBox
            inputName="artist"
            placeholder="Artist"
            label="Artist"
            items={artistsArr}
            searchPlaceholder="Search artists..."
          />
          <FormControl
            id="add-album-release-year"
            label="Release Year"
            name="releaseYear"
            placeholder="Release Year"
            type="number"
            // error={result?.errors?.releaseYear}
          />
          <SelectBox
            items={artistsArr}
            inputName="otherArtists"
            selectMethod="multiple"
            label="Other Artists"
            placeholder="Other Artists"
            searchPlaceholder="Search artists..."
          />
          <SelectBox
            inputName="musics"
            items={musicsArr}
            placeholder="Musics"
            searchPlaceholder="Search music..."
            label="Musics"
            selectMethod="multiple"
          />
          <CategoriesController />
          <ImageInput name="coverImageUrl" rounded="md" />
        </div>
      </fetcher.Form>
    </div>
  );
}

export default NewAlbum;
