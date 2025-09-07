import { getAllMusics } from "~/api/musicApi";
import MusicTable from "~/components/MusicTable/MusicTable";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/musics";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import EmptyDataSection from "~/components/EmptyDataSection";
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
      <PageHeading
        title={`Musics (${(loaderData as IMusic[]).length ?? "0"})`}
      />
      {(loaderData as IMusic[]) && (loaderData as IMusic[]).length > 0 ? (
        <MusicTable data={loaderData as IMusic[]} />
      ) : (
        <EmptyDataSection message="No Music is added">
          <MusicOffIcon
            fontSize="large"
            style={{
              width: "68px",
              height: "68px",
            }}
          />
        </EmptyDataSection>
      )}
    </div>
  );
}
