import { useTransition } from "react";
import { useNavigate, useRevalidator } from "react-router";
import ApiRequests from "~/api";

import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import AlbumFormFields, {
  type IAlbumFields,
} from "~/components/AlbumFormFields/AlbumFormFields";
import Button from "~/components/Button";
import PageHeading from "~/components/PageHeading";
import { useToast } from "~/store/useToast";
import { appendOtherArtists } from "~/utils/appendData";
import type { Route } from "./+types/new-album";

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
        // appending ids of artists instead of their name
        let artistsDataObject: string[] = [];
        loaderData.artists.forEach((el) => {
          if ((data.artists as string[]).includes(el.name)) {
            artistsDataObject = [...artistsDataObject, el._id];
          }
        });

        data.artists = artistsDataObject;

        if (data.otherArtists && data.otherArtists.length > 0) {
          appendOtherArtists(loaderData.artists, data);
        }

        let selectedMusics: string[] = [];
        for (const music of data.musics) {
          const selectedMusicId = (loaderData.musics as IMusic[]).find(
            (el) => el.name === music,
          )?._id;
          if (selectedMusicId) {
            selectedMusics = [...selectedMusics, selectedMusicId];
          }
        }
        data.musics = selectedMusics;

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
        <Button isPending={isPending} type="submit" className="my-10 w-37">
          Create
        </Button>
      </form>
    </div>
  );
}

export default NewAlbum;
