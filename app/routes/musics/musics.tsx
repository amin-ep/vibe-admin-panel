import type { Route } from "./+types/musics";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Musics",
    },
  ];
}

export default function Musics() {
  return <div>Musics</div>;
}
