import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/home";
import ApiRequests from "~/api";
import { getServerAuthToken } from "~/utils/helpers";
import StatsCard from "./components/StatsCard";
import StatsSection from "./components/StatsSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vibe Admin | Home" },
    { name: "description", content: "Welcome to Vibe Admin Panel" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const api = new ApiRequests();
  const authToken = getServerAuthToken(request);

  const userRes: ResponseObject = await api.getAllData<IUser>(
    "user",
    authToken,
  );
  const albumRes: ResponseObject = await api.getAllData<IAlbum>("album");
  const musicRes: ResponseObject = await api.getAllData<IMusic>("music");
  const artistRes: ResponseObject = await api.getAllData<IArtist>("artist");

  if (
    userRes.status === "success" &&
    albumRes.status === "success" &&
    musicRes.status === "success" &&
    artistRes.status === "success"
  ) {
    return {
      usersCount: (userRes as SuccessResponseObject<IUser>).result as number,
      albumsCount: (albumRes as SuccessResponseObject<IAlbum>).result as number,
      musicsCount: (musicRes as SuccessResponseObject<IMusic>).result as number,
      artistsCount: (artistRes as SuccessResponseObject<IArtist>)
        .result as number,
    };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if (loaderData)
    return (
      <div className="">
        <PageHeading title="Home" />
        <div>
          <StatsSection
            usersCount={loaderData.usersCount}
            albumsCount={loaderData.albumsCount}
            musicsCount={loaderData.musicsCount}
            artistsCount={loaderData.artistsCount}
          />
        </div>
      </div>
    );
}
