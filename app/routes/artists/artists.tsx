import ApiRequests from "~/api";
import PageHeading from "~/components/PageHeading";
import { ArtistProvider } from "~/contexts/ArtistContext";
import { getServerAuthToken } from "~/utils/helpers";
import type { Route } from "./+types/artists";
import ArtistForm from "./components/ArtistForm";
import ArtistsTable from "./components/ArtistsTable";
import EmptyDataSection from "~/components/EmptyDataSection";
import MicExternalOffIcon from "@mui/icons-material/MicExternalOff";
export async function loader({ request }: Route.LoaderArgs) {
  const authToken = getServerAuthToken(request);
  const api = new ApiRequests();
  const artists: ResponseObject = await api.getAllData<IArtist>(
    "artist",
    authToken as string,
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

          {(loaderData as IArtist[]) &&
            ((loaderData as IArtist[]).length > 0 ? (
              <ArtistsTable artists={loaderData as IArtist[]} />
            ) : (
              <EmptyDataSection message="No artist is added">
                <MicExternalOffIcon
                  style={{
                    width: "68px",
                    height: "68px",
                  }}
                  fontSize="large"
                />
              </EmptyDataSection>
            ))}
        </div>
      </div>
    </ArtistProvider>
  );
}

// TODO: GLOBAL STATE MANAGER

export default Artists;
