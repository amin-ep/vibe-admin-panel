import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/musics";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Musics",
    },
  ];
}

export default function Musics() {
  return (
    <div>
      <PageHeading title="Musics" />
    </div>
  );
}
