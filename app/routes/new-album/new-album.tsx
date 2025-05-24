import { useTransition } from "react";
import { useNavigate, useRevalidator } from "react-router";
import ApiRequests from "~/api";

import { useForm } from "react-hook-form";
import AlbumFormFields, {
  type IAlbumFields,
} from "~/components/AlbumFormFields/AlbumFormFields";
import Button from "~/components/Button";
import PageHeading from "~/components/PageHeading";
import { useToast } from "~/store/useToast";
import type { Route } from "./+types/new-album";
import { appendMusics, appendOtherArtists } from "~/utils/appendData";
import type { AxiosError } from "axios";

export function meta() {
  return [{ title: "New Album" }];
}
const api = new ApiRequests();
export async function loader({}: Route.LoaderArgs) {
  const artists = await api.getAllData<IArtist>("artist");
  const musics: ResponseObject = await api.getAllData<IMusic>("music");
  return {
    artists: (artists as SuccessResponseObject<IArtist[]>)?.data,
    musics: musics?.data,
  };
}

function NewAlbum({ loaderData }: Route.ComponentProps) {
  const [isPending, startTransition] = useTransition();

  const { success, error } = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAlbumFields>();

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const onSubmit = (data: IAlbumFields) => {
    const formData = new FormData();
    startTransition(async () => {
      if (loaderData.artists && loaderData.musics) {
        const selectedArtistsId = loaderData.artists.find(
          (artist) => artist.name == data.artist,
        )?._id;

        if (selectedArtistsId) {
          data.artist = selectedArtistsId;
        } else {
          error("Cannot get artist data. Try again later");
        }
        console.log(data);

        if (data.otherArtists && data.otherArtists.length > 0) {
          appendOtherArtists(loaderData.artists, data);
        }

        if (data.musics) {
          appendMusics(loaderData.musics as IMusic[], data.musics as string[]);
        }

        for (const [key, value] of Object.entries(data)) {
          if (typeof value === "string" || value instanceof File) {
            formData.set(key, value);
          } else {
            if (Array.isArray(value)) {
              for (let i = 0; value.length > i; i++) {
                formData.set(`${key}[${i}]`, value[i]);
              }
            }
          }
        }

        const res = await api.createData("album", formData);
        console.log(res);
        if (res.status === 201) {
          revalidator.revalidate().then(() => {
            success("Album added successfully");
            navigate("/albums");
          });
        } else {
          const err = res as AxiosError<IApiError>;

          error(err.response?.data.message || "Something went wrong!");
        }
      } else {
        error("Something went wrong. try again later!");
      }
    });
  };

  return (
    <div>
      <PageHeading title="Add New Album" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {loaderData && (
          <AlbumFormFields
            artists={loaderData.artists}
            errors={errors}
            musics={loaderData.musics}
            control={control}
            register={register}
          />
        )}
        <Button disabled={isPending} type="submit" className="my-10 w-37">
          {isPending ? "Creating..." : "Click to Create"}
        </Button>
      </form>
    </div>
  );
}

export default NewAlbum;
