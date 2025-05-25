import { redirect } from "react-router";
import ApiRequests from "~/api";
import { getMusicStats } from "~/api/musicApi";
import PageHeading from "~/components/PageHeading";
import { AUTH_TOKEN_KEY } from "~/utils/constants";
import type { Route } from "./+types/home";
import MusicChartTab from "./components/MusicChartTab/MusicChartTab";
import PerArtistBartChart from "./components/PerArtistBartChart";
import PopularList from "./components/PopularList";
import RegisteredUsersChart from "./components/RegisteredUsersChart";
import StatsSection from "./components/StatsSection";
import styles from "./home.module.css";
import { getServerAuthToken } from "~/utils/helpers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vibe Admin | Home" },
    { name: "description", content: "Welcome to Vibe Admin Panel" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const api = new ApiRequests();

  const authToken = getServerAuthToken(request);
  console.log({ authToken });

  if (!authToken) {
    return redirect("/login");
  } else {
    const userRes: ResponseObject = await api.getAllData<IUser>(
      "user",
      authToken,
    );
    const albumRes: ResponseObject = await api.getAllData<IAlbum>("album");
    const musicRes: ResponseObject = await api.getAllData<IMusic>("music");
    const artistRes: ResponseObject = await api.getAllData<IArtist>("artist");
    const musicStatsResponse: ResponseObject = await getMusicStats(authToken);

    if (
      userRes.status === "success" &&
      albumRes.status === "success" &&
      musicRes.status === "success" &&
      artistRes.status === "success" &&
      musicStatsResponse.status === "success"
    ) {
      return {
        usersCount: (userRes as SuccessResponseObject<IUser[]>)
          .result as number,
        albumsCount: (albumRes as SuccessResponseObject<IAlbum[]>)
          .result as number,
        musicsCount: (musicRes as SuccessResponseObject<IMusic[]>)
          .result as number,
        artistsCount: (artistRes as SuccessResponseObject<IArtist[]>)
          .result as number,
        musicStats: (musicStatsResponse as SuccessResponseObject<IMusicStats>)
          .data,
        albums: (albumRes as SuccessResponseObject<IAlbum[]>).data,
        musics: (musicRes as SuccessResponseObject<IMusic[]>).data,
        users: (userRes as SuccessResponseObject<IUser[]>).data,
      };
    }
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if (loaderData)
    return (
      <div>
        <PageHeading title="Home" />
        <div className="flex flex-col gap-2 lg:gap-6">
          <StatsSection
            usersCount={loaderData.usersCount}
            albumsCount={loaderData.albumsCount}
            musicsCount={loaderData.musicsCount}
            artistsCount={loaderData.artistsCount}
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[40%_60%] md:grid-cols-[45%_55%] lg:gap-6">
            <MusicChartTab musicStats={loaderData.musicStats} />
            <PerArtistBartChart data={loaderData.musicStats.musicsPerArtist} />
          </div>
          <div className={styles["popular-stats"]}>
            <PopularList
              data={loaderData.musics as IMusic[]}
              heading="Most popular musics"
              className={styles["popular-musics"]}
            />
            <PopularList
              heading="Most popular albums"
              data={loaderData.albums}
              className={styles["popular-albums"]}
            />
            <RegisteredUsersChart
              className={styles["registered-users-chart"]}
              users={loaderData.users}
            />
          </div>
        </div>
      </div>
    );
}
