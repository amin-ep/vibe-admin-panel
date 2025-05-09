import { validate } from "~/utils/validate";
import { createAlbumValidator } from "~/validators/album-validators";
import ApiRequests from ".";

export async function createAlbum(
  prevState: CreateDataState | null,
  formData: FormData,
) {
  let errors: RequestError = {};
  const payload: Payload = Object.fromEntries(formData);
  // convert type of release year to number
  payload.releaseYear = Number(payload.releaseYear);

  // get data of musics
  const api = new ApiRequests();
  const musics = await api.getAllData<IMusic>("music");

  if (musics?.status === "success") {
    const payloadMusics = payload.musics as string;
    // if length payload's musics is 0 return error
    if (payloadMusics.length === 0) {
      return {
        status: "error",
        errors: { musics: "Please choose some musics" },
      };
    } else {
      // set id of musics in form data and payload object instead of names
      const musicArray = payloadMusics.split(",");
      const musicsIdsArray = musicArray.map((msc: string) => {
        const musicsId = musics.data.find(
          (dataMusic) => dataMusic.name === msc,
        )?._id;
        return musicsId;
      });
      delete payload.musics;
      (payload.musics as string[]) = musicsIdsArray as string[];

      formData.delete("musics");
      for (let i = 0; (payload.musics as string[]).length > i; i++) {
        formData.append(`musics[${i}]`, (payload.musics as string[])[i]);
      }
    }

    // get artists data
    const artists = await api.getAllData<IArtist>("artist");
    if (artists?.status === "success") {
      const selectedArtistId = artists?.data?.find(
        (el) => el.name == payload.artist,
      )?._id;
      formData.delete("artist");
      formData.append("artist", selectedArtistId as string);
      payload.artist = selectedArtistId as string;
      if (payload.otherArtists) {
        formData.delete("otherArtists");
        const otherArtistsArray = (payload.otherArtists as string).split(",");
        const otherArtistsIdsArray = otherArtistsArray.map((artist) => {
          const artistId = (artists.data as IArtist[]).find(
            (el) => el.name === artist,
          )?._id;
          return artistId;
        });
        delete payload.otherArtists;
        payload.otherArtists = otherArtistsIdsArray as string[];
        for (let i = 0; (payload.otherArtists as string[]).length > i; i++) {
          formData.delete("otherArtists");
          formData.append(
            `otherArtists[${i}]`,
            (payload.otherArtists as string[])[i],
          );
        }
        payload.categories = String(payload.categories).split(",");
        // set categories in formData
        formData.delete("categories");
        for (let i = 0; payload.categories.length > i; i++) {
          formData.append(`categories[${i}]`, payload.categories[i]);
        }
      }

      // validate input data
      console.log(Object.fromEntries(formData));
      console.log(payload);
      const validationErrors = await validate(createAlbumValidator, payload);

      // return errors if there is any validation error
      if (validationErrors) {
        errors = validationErrors;
        return { status: "error", errors };
      }

      const response = await api.createData<IAlbum>("album", formData);

      return { status: response?.status, data: response?.data };
    } else {
      return {
        status: "error",
        message: "Something went wrong. Cannot get artists data!",
      };
    }
  } else {
    return {
      status: "error",
      message: "Something went wrong. Cannot get music data!",
    };
  }
}
