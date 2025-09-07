import PageHeading from "~/components/PageHeading";
import AlbumsList from "./components/AlbumsList";
import type { Route } from "./+types/albums";
import ApiRequests from "~/api";
import EmptyDataSection from "~/components/EmptyDataSection";
import SearchOffIcon from "@mui/icons-material/SearchOff";
export function meta() {
  return [{ title: "Albums" }];
}

export async function loader() {
  const api = new ApiRequests();
  const response: ResponseObject = await api.getAllData<IAlbum>("album");
  return response?.data as IAlbum[];
}

function Albums({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <PageHeading title="Albums" />
      {(loaderData as IAlbum[]) && (loaderData as IAlbum[]).length > 0 ? (
        <AlbumsList albumData={loaderData as IAlbum[]} />
      ) : (
        <EmptyDataSection message="No Album Found">
          <SearchOffIcon
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

export default Albums;
