import { useActionState, useEffect } from "react";
import { useNavigate, useRevalidator } from "react-router";
import { toast } from "react-toastify";
import ApiRequests from "~/api";
import { createAlbum } from "~/api/albumApi";
import AlbumFormFields from "~/components/AlbumFormFields/AlbumFormFields";
import Button from "~/components/Button";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/new-album";
import { useToast } from "~/store/useToast";

export function meta() {
  return [{ title: "New Album" }];
}

export async function loader({}: Route.LoaderArgs) {
  const api = new ApiRequests();
  const artists: ResponseObject = await api.getAllData<IArtist>("artist");
  const musics: ResponseObject = await api.getAllData<IMusic>("music");
  return {
    artists: artists?.data,
    musics: musics?.data,
  };
}

function NewAlbum({ loaderData }: Route.ComponentProps) {
  // @ts-ignore
  const [result, formAction, isPending] = useActionState(createAlbum, null);

  const { success, error } = useToast();

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        revalidator.revalidate();
        success(result.message || "Album added successfully");
        navigate("/albums");
      }
      if (result.status === "error" || result.status === "fail") {
        error(result.message || "Something went wrong!");
      }
    }
  }, [result]);

  return (
    <div>
      <PageHeading title="Add New Album" />
      <form action={formAction}>
        {loaderData && (
          <AlbumFormFields
            artists={loaderData.artists}
            errors={result?.errors}
            musics={loaderData.musics}
          />
        )}
        <Button type="submit" className="my-10 w-37">
          {isPending ? "Creating..." : "Click to Create"}
        </Button>
      </form>
    </div>
  );
}

export default NewAlbum;
