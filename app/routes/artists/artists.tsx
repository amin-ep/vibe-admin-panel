import ApiRequests from "~/api";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/artists";
import AddArtistForm from "./components/AddArtistForm";
import ArtistsTable from "./components/ArtistsTable";

export async function loader() {
  const api = new ApiRequests();
  const artists = await api.getAllData<IArtist>("artist");

  return artists;
}

export function meta() {
  return [{ title: "Artists" }];
}

function Artists({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      <PageHeading title="Artists" />
      <div className="grid grid-cols-1 flex-row-reverse gap-4 md:grid-cols-[1fr_70%]">
        <AddArtistForm />

        {(loaderData as IArtist[]) && (
          <ArtistsTable artists={loaderData as IArtist[]} />
        )}
      </div>
    </div>
  );
}

export default Artists;
