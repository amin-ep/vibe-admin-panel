import type { AxiosError } from "axios";
import { useCallback, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useRevalidator } from "react-router";
import ApiRequests from "~/api";
import Button from "~/components/Button";
import MusicFormFields, {
  type IMusicFields,
} from "~/components/MusicFormFields/MusicFormFields";
import PageHeading from "~/components/PageHeading";
import { useToast } from "~/store/useToast";
import { appendOtherArtists } from "~/utils/appendData";
import type { Route } from "./+types/edit-music";

export async function loader({ params }: Route.LoaderArgs) {
  const { musicId } = await params;
  const api = new ApiRequests();
  const musicRes: ResponseObject = await api.getDataById<IMusic>(
    "music",
    musicId,
  );
  const artistsRes: ResponseObject = await api.getAllData<IArtist>("artist");
  const allMusics: ResponseObject = await api.getAllData<IMusic>("music");
  console.log(allMusics);
  return {
    music: musicRes?.data as IMusic,
    artists: artistsRes?.data as IArtist[],
    musics: allMusics.data as IMusic[],
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `Edit ${data?.music?.name}` }];
}

function EditMusic({ loaderData, params }: Route.ComponentProps) {
  const { musicId } = params;
  const [isPending, startTransition] = useTransition();
  const musicData = loaderData.music;
  const artistData = loaderData.artists;

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IMusicFields>();

  // @ts-ignore
  const { success, error } = useToast();

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    const musicData = loaderData.music;
    if (musicData) {
      reset({
        artists: loaderData.music.artists.map((artist) => artist.name),
        audioFileUrl: loaderData.music.audioFileUrl,
        categories: loaderData.music.categories,
        coverImageUrl: loaderData.music.coverImageUrl,
        genre: loaderData.music.genre,
        name: loaderData.music.name,
        otherArtists: loaderData.music.otherArtists ?? [],
        releaseYear: loaderData.music.releaseYear,
      });
    }
  }, [reset, loaderData.music]);

  const onSubmit = useCallback(
    (data: Partial<IMusicFields>) => {
      startTransition(async () => {
        // delete values if nothing changed
        if (typeof data.audioFileUrl == "string") {
          delete data.audioFileUrl;
        }

        if (typeof data.coverImageUrl == "string") {
          delete data.coverImageUrl;
        }
        if (musicData.name.trim() === data.name) delete data.name;

        if (data.artists && data.artists.length > 0) {
          // artists of musicData has all items of data artists
          const artistsNotChanged =
            data.artists.every((el) =>
              musicData.artists.map((el) => el.name).includes(el),
            ) && data.artists.length === musicData.artists.length;
          if (artistsNotChanged) {
            delete data.artists;
          } else {
            let selectedArtistsArr: string[] = [];
            for (const artist of data.artists) {
              const selectedArtistsId = artistData.find(
                (el) => el.name == artist,
              )?._id;
              if (selectedArtistsId) {
                selectedArtistsArr = [...selectedArtistsArr, selectedArtistsId];
              }
            }
            data.artists = selectedArtistsArr;
          }
        }

        if (musicData.genre === data.genre) delete data.genre;
        if (musicData.releaseYear === Number(data.releaseYear))
          delete data.releaseYear;
        if (
          (data.categories as string[]).every(
            (category) =>
              musicData.categories?.includes(category) &&
              data.categories?.length === musicData.categories.length,
          )
        ) {
          delete data.categories;
        }
        if (data.otherArtists && typeof data.otherArtists[0] === "object") {
          delete data.otherArtists;
        }

        if (Object.keys(data).length === 0) {
          error("Please change some data to edit");
        } else {
          let payload: FormData | Partial<IMusicFields>;
          if (artistData) {
            if (data.otherArtists && data.otherArtists.length > 0) {
              if (
                data.otherArtists.length === 0 &&
                musicData.otherArtists.length === 0
              ) {
                delete data.otherArtists;
              } else {
                appendOtherArtists<IMusicFields>(
                  artistData,
                  data as IMusicFields,
                );
              }
            }
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
            Partial<IMusicFields>
          >("music", musicId, payload);
          if (response.status === 200) {
            revalidator.revalidate().then(() => {
              success("Music updated successfully");
              navigate("/musics");
            });
          } else {
            error(
              (response as AxiosError<IApiError>).message ||
                "Something went wrong!",
            );
          }
        }
      });
    },
    [musicId],
  );

  return (
    <div>
      <PageHeading title="Edit" />
      {musicData && artistData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <MusicFormFields
            artists={artistData as IArtist[]}
            musicData={musicData}
            control={control}
            errors={errors}
            register={register}
            allMusics={loaderData.musics}
          />
          <Button
            type="submit"
            variation="primary"
            className="my-5 w-30"
            isPending={isPending}
          >
            Edit
          </Button>
        </form>
      )}
    </div>
  );
}

export default EditMusic;
