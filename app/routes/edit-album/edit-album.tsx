import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useRevalidator } from "react-router";
import ApiRequests from "~/api";
import AlbumFormFields, {
  type IAlbumFields,
} from "~/components/AlbumFormFields/AlbumFormFields";
import Button from "~/components/Button";
import PageHeading from "~/components/PageHeading";
import { useToast } from "~/store/useToast";
import { appendMusics, appendOtherArtists } from "~/utils/appendData";
import type { Route } from "./+types/edit-album";
import type { AxiosError } from "axios";

export async function loader({ params }: Route.LoaderArgs) {
  const { albumId } = params;
  const api = new ApiRequests();

  const album: ResponseObject = await api.getDataById<IAlbum>("album", albumId);
  const artists: ResponseObject = await api.getAllData<IArtist>("artist");
  const musics: ResponseObject = await api.getAllData<IMusic>("music");

  return {
    artists: (artists as SuccessResponseObject<IArtist[]>).data as IArtist[],
    album: (album as SuccessResponseObject<IAlbum>).data,
    musics: (musics as SuccessResponseObject<IMusic[]>).data,
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `Edit ${data.album.name}` }];
}

function EditAlbum({ loaderData, params }: Route.ComponentProps) {
  const [isPending, startTransition] = useTransition();
  const { albumId } = params;
  const artistsData = loaderData.artists as IArtist[];
  const musicsData = loaderData.musics as IMusic[];

  const { success, error } = useToast();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<IAlbumFields>();

  useEffect(() => {
    if (loaderData) {
      const albumData = loaderData.album;
      reset({
        artist: albumData.artist.name,
        categories: albumData.categories,
        coverImageUrl: albumData.coverImageUrl,
        musics: albumData.musics,
        name: albumData.name,
        otherArtists: albumData.otherArtists,
        releaseYear: albumData.releaseYear,
      });
    }
  }, []);

  const onSubmit = (data: Partial<IAlbumFields>) => {
    startTransition(async () => {
      if (typeof data.coverImageUrl == "string") {
        delete data.coverImageUrl;
      }
      if (loaderData.album.name.trim() === data.name) delete data.name;
      if (loaderData.album.artist.name === data.artist) delete data.artist;
      if (loaderData.album.releaseYear === Number(data.releaseYear))
        delete data.releaseYear;
      if (
        (data.categories as string[]).every(
          (category) =>
            loaderData.album.categories?.includes(category) &&
            data.categories?.length === loaderData.album.categories.length,
        )
      ) {
        delete data.categories;
      }
      if (data.otherArtists && typeof data.otherArtists[0] === "object") {
        delete data.otherArtists;
      }
      if (data.musics && typeof data.musics[0] === "object") delete data.musics;

      if (Object.keys(data).length === 0) {
        error("Please change some data to edit");
      } else {
        let payload: FormData | Partial<IAlbumFields>;
        if (artistsData) {
          if (data.artist) {
            const selectedArtistsId = artistsData.find(
              (artist) => artist.name == data.artist,
            )?._id;
            console.log(selectedArtistsId);

            if (selectedArtistsId) {
              data.artist = selectedArtistsId;
            } else {
              error("Cannot get artist data. Try again later");
            }
          }

          if (data.otherArtists && data.otherArtists.length > 0) {
            appendOtherArtists<IAlbumFields>(artistsData, data as IAlbumFields);
          }
        }

        if (data.musics && musicsData) {
          appendMusics(musicsData, data.musics as string[]);
        }

        if (data.coverImageUrl || data.audioFileUrl) {
          const formData = new FormData();

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
          payload = formData;
        } else {
          payload = data;
        }
        const api = new ApiRequests();
        const response = await api.updateDataById<
          IMusic,
          Partial<IAlbumFields>
        >("album", albumId, payload);
        if (response.status === 200) {
          revalidator.revalidate().then(() => {
            success("Album updated successfully");
            navigate("/albums");
          });
        } else {
          error(
            (response as AxiosError<IApiError>).message ||
              "Something went wrong!",
          );
        }
      }
    });
  };
  return (
    <div>
      <PageHeading title={`Edit "${loaderData.album.name}" album`} />
      {loaderData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlbumFormFields
            errors={errors}
            register={register}
            control={control}
            artists={loaderData.artists}
            musics={loaderData.musics}
            albumData={loaderData.album}
          />
          <Button isPending={isPending} className="my-5 w-37" type="submit">
            Edit
          </Button>
        </form>
      )}
    </div>
  );
}

export default EditAlbum;
