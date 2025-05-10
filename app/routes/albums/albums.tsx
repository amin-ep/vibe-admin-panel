import PageHeading from "~/components/PageHeading";
import AlbumsList from "./components/AlbumsList";
import type { Route } from "./+types/albums";
import ApiRequests from "~/api";

export function meta() {
  return [{ title: "Albums" }];
}

export async function loader() {
  const api = new ApiRequests();
  const response = await api.getAllData<IAlbum>("album");
  return response?.data;
}

function Albums({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <PageHeading title="Albums" />
      {(loaderData as IAlbum[]) && (
        <AlbumsList albumData={loaderData as IAlbum[]} />
      )}
    </div>
  );
}

export default Albums;
