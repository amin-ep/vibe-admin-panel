import ApiRequests from "~/api";
import type { Route } from "./+types/album";
import PageHeading from "~/components/PageHeading";
import MusicTable from "~/components/MusicTable/MusicTable";

export function meta({ params, data }: Route.MetaArgs) {
  return [{ title: `${data?.name} Album` || "Not found" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { albumId } = params;
  const api = new ApiRequests();
  const res: ResponseObject = await api.getDataById<IAlbum>("album", albumId);

  return res?.data as IAlbum;
}

function Album({ loaderData: data }: Route.ComponentProps) {
  if (data) {
    const artist = data.artists.map((artist) => artist.name);
    return (
      <div>
        <PageHeading
          title={`"${data?.name}" Album by ${artist.length === 1 ? artist : artist.join(" & ")}`}
        />
        <MusicTable data={data.musics} />
      </div>
    );
  }
}

export default Album;
