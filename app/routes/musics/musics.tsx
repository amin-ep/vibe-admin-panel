import { getAllMusics } from "~/api/musicApi";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/musics";
import MusicTable from "./components/MusicTable";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Musics",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const musics = await getAllMusics();
  return musics;
}

export default function Musics({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <PageHeading title="Musics" />
      {(loaderData as IMusic[]) && <MusicTable data={loaderData as IMusic[]} />}
    </div>
  );
}
