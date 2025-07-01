import { useTransition } from "react";
import { getAllArtists } from "~/api/artistApi";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/new-music";

import { useForm } from "react-hook-form";
import { useNavigate, useRevalidator } from "react-router";
import Button from "~/components/Button";
import MusicFormFields, {
  type IMusicFields,
} from "~/components/MusicFormFields/MusicFormFields";
import { useToast } from "~/store/useToast";
import ApiRequests from "~/api";
import type { AxiosError, AxiosResponse } from "axios";
import { appendOtherArtists } from "~/utils/appendData";
import SpinnerLoader from "~/components/SpinnerLoader/SpinnerLoader";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Music" }];
}

export async function loader({}: Route.LoaderArgs) {
  const artists = await getAllArtists();
  return artists;
}

export default function NewMusic({ loaderData }: Route.ComponentProps) {
  const [isPending, startTransition] = useTransition();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IMusicFields>();

  const api = new ApiRequests();

  const onSubmit = (data: IMusicFields) => {
    const formData = new FormData();
    startTransition(async () => {
      if (loaderData?.data) {
        // appending ids of artists instead of their name
        let artistsDataObject: string[] = [];

        loaderData.data.forEach((el) => {
          if ((data.artists as string[]).includes(el.name)) {
            artistsDataObject = [...artistsDataObject, el._id];
          }
        });
        data.artists = artistsDataObject;

        if (data.otherArtists && data.otherArtists.length > 0) {
          appendOtherArtists<IMusicFields>(loaderData.data, data);
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
        const res = await api.createData<IMusic>("music", formData);
        if (res.status === 201) {
          revalidator.revalidate().then(() => {
            success("Music added successfully");
            navigate("/musics");
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
      <PageHeading title="Add Music" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MusicFormFields
            artists={loaderData?.data as IArtist[]}
            register={register}
            errors={errors}
            control={control}
          />
          <Button
            type="submit"
            className="my-10 flex w-38 items-center justify-center"
            isPending={isPending}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
