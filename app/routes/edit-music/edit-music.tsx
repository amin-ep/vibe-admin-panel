import ApiRequests from "~/api";
import { editMusic } from "~/api/musicApi";
import Button from "~/components/Button";
import MusicFormFields from "~/components/MusicFormFields/MusicFormFields";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/edit-music";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useRevalidator } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const { musicId } = await params;
  const api = new ApiRequests();
  const musicRes: ResponseObject = await api.getDataById<IMusic>(
    "music",
    musicId,
  );
  const artistsRes: ResponseObject = await api.getAllData<IArtist>("artist");
  return {
    music: musicRes?.data?.document,
    artists: artistsRes?.data,
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `Edit ${data?.music?.name}` }];
}

function EditMusic({ loaderData }: Route.ComponentProps) {
  const musicData = loaderData.music;
  const artistData = loaderData.artists;

  // @ts-ignore
  const [result, formAction, isPending] = useActionState(editMusic, null);

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        revalidator.revalidate();
        toast.success("Music Updated successfully");
        navigate("/musics");
      }
      if (result.status === "error" || result.status === "fail") {
        toast.error(result.message || "Something went wrong!");
      }
    }
  }, [result]);

  return (
    <div>
      <PageHeading title="Edit" />
      {musicData && artistData && (
        <form action={formAction}>
          <input type="hidden" name="musicId" value={musicData._id} />
          <MusicFormFields
            mode="update"
            artists={artistData as IArtist[]}
            musicData={musicData}
            errors={result?.errors}
            values={result?.values}
          />
          <Button type="submit" variation="primary" className="my-5 w-30">
            {isPending ? "Editing..." : "Edit"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default EditMusic;
