import { validate } from "~/utils/validate";
import { createAlbumValidator } from "~/validators/album-validators";
import ApiRequests from ".";
import {
  appendArtist,
  appendCategories,
  appendMusics,
  appendOtherArtists,
} from "~/utils/helpers";

export async function createAlbum(
  _prevState: CreateDataState | null,
  formData: FormData,
) {
  let errors: RequestError = {};
  const payload: Payload = Object.fromEntries(formData);
  // convert type of release year to number
  payload.releaseYear = Number(payload.releaseYear);

  // get data of musics
  const api = new ApiRequests();
  const musics: ResponseObject = await api.getAllData<IMusic>("music");

  if (musics && musics?.status === "success") {
    const payloadMusics = payload.musics as string;
    // if length payload's musics is 0 return error
    if (payloadMusics.length === 0) {
      return {
        status: "error",
        errors: { musics: "Please choose some musics" },
      };
    } else {
      // set id of musics in form data and payload object instead of names
      appendMusics(
        (musics as SuccessResponseObject<IMusic[]>).data,
        payload,
        formData,
      );
    }

    // get artists data
    const artists: ResponseObject = await api.getAllData<IArtist>("artist");
    if (artists && artists?.status === "success") {
      const selectedArtistId = artists?.data?.find(
        (el: IArtist) => el.name == payload.artist,
      )?._id;
      appendArtist(
        (artists as SuccessResponseObject<IArtist[]>).data as IArtist[],
        formData,
      );
      payload.artist = selectedArtistId as string;
      if (payload.otherArtists) {
        payload.otherArtists = (payload.otherArtists as string).split(",");
        appendOtherArtists(
          formData,
          (artists as SuccessResponseObject<IArtist[]>).data as IArtist[],
        );
      }
      // set categories in formData
      payload.categories = String(payload.categories).split(",");
      appendCategories(formData, payload.categories);

      // validate input data
      const validationErrors = await validate(createAlbumValidator, payload);

      // return errors if there is any validation error
      if (validationErrors) {
        errors = validationErrors;
        return { status: "error", errors };
      }

      const response: ResponseObject = await api.createData<IAlbum>(
        "album",
        formData,
      );

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

export async function editAlbum(
  _prevState: CreateDataState | null,
  formData: FormData,
) {
  const api = new ApiRequests();
  const artistsData: ResponseObject = await api.getAllData<IArtist>("artist");
  const musicsData: ResponseObject = await api.getAllData<IMusic>("music");
  const albumId = formData.get("albumId")?.toString();
  formData.delete("albumId");

  if (
    artistsData &&
    musicsData &&
    musicsData.status === "success" &&
    artistsData.status === "success"
  ) {
    const categories = formData.get("categories")?.toString().split(",")!;

    const inputDataObject: FormValues = {
      name: formData.get("name") || "",
      artist:
        (artistsData as SuccessResponseObject<IArtist[]>).data.find(
          (artist) => artist.name === formData.get("artist"),
        )?._id || "",
      categories: categories[0] === "" ? [] : categories,
      otherArtists: formData.get("otherArtists")?.toString().split(",") || [],
      releaseYear: Number(formData.get("releaseYear")) ?? 0,
      musics: formData.get("musics")?.toString() || [],
    };

    if (
      inputDataObject.musics &&
      (inputDataObject.musics as string[]).length > 0
    ) {
      appendMusics(
        (musicsData as SuccessResponseObject<IMusic[]>).data,
        inputDataObject,
        formData,
      );
      if (inputDataObject.categories) {
        appendCategories(formData, inputDataObject.categories as string[]);
      }
      if (inputDataObject.otherArtists) {
        appendOtherArtists(
          formData,
          (artistsData as SuccessResponseObject<IArtist[]>).data,
        );
      }
      appendArtist(
        (artistsData as SuccessResponseObject<IArtist[]>).data,
        formData,
      );

      if ((formData.get("coverImageUrl") as File).name === "") {
        formData.delete("coverImageUrl");
      }

      const res: ResponseObject = await api.updateDataById(
        "album",
        albumId as string,
        formData,
      );
      console.log(res);
      return { status: res.status, message: res?.message, data: res?.data };
    }
  }
}
