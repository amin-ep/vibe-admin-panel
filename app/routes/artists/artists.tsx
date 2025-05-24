import ApiRequests from "~/api";
import PageHeading from "~/components/PageHeading";
import { ArtistProvider } from "~/contexts/ArtistContext";
import { getServerAuthToken } from "~/utils/helpers";
import type { Route } from "./+types/artists";
import ArtistForm from "./components/ArtistForm";
import ArtistsTable from "./components/ArtistsTable";

export async function loader({ request }: Route.LoaderArgs) {
  const authToken = getServerAuthToken(request);
  const api = new ApiRequests();
  const artists: ResponseObject = await api.getAllData<IArtist>(
    "artist",
    authToken,
  );

  return (artists as SuccessResponseObject<IArtist[]>).data;
}

export function meta() {
  return [{ title: "Artists" }];
}

function Artists({ loaderData }: Route.ComponentProps) {
  return (
    <ArtistProvider>
      <div className="flex flex-col gap-5">
        <PageHeading title="Artists" />
        <div className="grid grid-cols-1 flex-row-reverse gap-4 md:grid-cols-[1fr_70%]">
          <ArtistForm />

          {(loaderData as IArtist[]) && (
            <ArtistsTable artists={loaderData as IArtist[]} />
          )}
        </div>
      </div>
    </ArtistProvider>
  );
}

// TODO: GLOBAL STATE MANAGER

export default Artists;
