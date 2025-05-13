import { useActionState, useEffect } from "react";
import { getAllArtists } from "~/api/artistApi";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/new-music";

import { useNavigate, useRevalidator } from "react-router";
import { toast } from "react-toastify";
import { createMusic } from "~/api/musicApi";
import Button from "~/components/Button";
import MusicFormFields from "~/components/MusicFormFields/MusicFormFields";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Music" }];
}

export async function loader({}: Route.LoaderArgs) {
  const artists = await getAllArtists();
  return artists;
}

export default function NewMusic({ loaderData }: Route.ComponentProps) {
  const [result, formAction, isPending] = useActionState<CreateDataState>(
    //@ts-ignore
    createMusic,
    null,
  );

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        revalidator.revalidate();
        toast.success(result.message);
        navigate("/musics");
      }
      if (result.status === "error" || result.status === "fail") {
        toast.error(result.message || "Something went wrong!");
      }
    }
  }, [result]);

  return (
    <div>
      <PageHeading title="Add Music" />
      <div>
        <form action={formAction}>
          <MusicFormFields
            artists={loaderData?.data as IArtist[]}
            errors={result?.errors}
            values={result?.values}
          />
          <Button type="submit" className="my-10 w-38">
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
}
