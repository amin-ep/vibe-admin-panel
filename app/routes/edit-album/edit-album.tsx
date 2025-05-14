import { useActionState, useEffect } from "react";
import { useNavigate, useRevalidator } from "react-router";
import ApiRequests from "~/api";
import { editAlbum } from "~/api/albumApi";
import AlbumFormFields from "~/components/AlbumFormFields/AlbumFormFields";
import Button from "~/components/Button";
import PageHeading from "~/components/PageHeading";
import { useToast } from "~/store/useToast";
import type { Route } from "./+types/edit-album";

export async function loader({ params }: Route.LoaderArgs) {
  const { albumId } = params;
  const api = new ApiRequests();

  const album: ResponseObject = await api.getDataById<IAlbum>("album", albumId);
  const artists: ResponseObject = await api.getAllData<IArtist>("artist");
  const musics: ResponseObject = await api.getAllData<IMusic>("music");

  return {
    artists: (artists as SuccessResponseObject<IArtist[]>).data,
    album: (album as SuccessResponseObject<IAlbum>).data,
    musics: (musics as SuccessResponseObject<IMusic[]>).data,
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `Edit ${data.album.name}` }];
}

function EditAlbum({ loaderData, params }: Route.ComponentProps) {
  const { albumId } = params;
  // @ts-ignore
  const [result, formAction, isPending] = useActionState(editAlbum, null);

  const { success, error } = useToast();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        revalidator.revalidate();
        success("Album Updated successfully");
        navigate("/albums");
      }
      if (result.status === "error" || result.status === "fail") {
        error(result.message || "Something went wrong!");
      }
    }
  }, [result]);
  return (
    <div>
      <PageHeading title={`Edit "${loaderData.album.name}" album`} />
      {loaderData && (
        <form action={formAction}>
          <input type="hidden" name="albumId" value={albumId} />
          <AlbumFormFields
            artists={loaderData.artists}
            musics={loaderData.musics}
            mode="update"
            albumData={loaderData.album}
          />
          <Button className="my-5 w-37" type="submit">
            {isPending ? "Editing..." : "Click To Edit"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default EditAlbum;
