import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/new-artist";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "New Artist",
    },
  ];
}
function NewArtist() {
  return (
    <div>
      <PageHeading title="Add Artist" />
    </div>
  );
}

export default NewArtist;
