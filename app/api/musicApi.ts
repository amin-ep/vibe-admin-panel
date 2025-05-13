import axios, { AxiosError, type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "~/utils/constants";
import { validate } from "~/utils/validate";
import {
  validateCreateMusic,
  validateEditMusic,
} from "~/validators/music-validators";
import { getAllArtists } from "./artistApi";
import type { z } from "zod";
import ApiRequests from ".";

export async function getAllMusics() {
  try {
    const res: AxiosResponse<
      GetAllDataResponse<IMusic>,
      IApiError
    > = await axios.get(`${process.env.API_BASE_URL}/music`);
    if (res.data.status === "success") return res.data.data.docs;
  } catch (err) {
    const error = err as AxiosError<IApiError>;
    if (error) {
      return {
        status: error?.response?.data.status || "error",
        message:
          error?.response?.data.message || "something went wrong from server",
      };
    }
  }
}

function appendCategories(formData: FormData, payloadCategories: string[]) {
  formData.delete("categories");
  for (let i = 0; payloadCategories.length > i; i++) {
    formData.append(`categories[${i}]`, payloadCategories[i]);
  }
}

function appendArtist(artists: IArtist[], formData: FormData) {
  const selectedArtistId = artists.find(
    (artist) => artist.name == Object.fromEntries(formData).artist,
  );
  formData.delete("artist");
  formData.append("artist", selectedArtistId?._id as string);
}

function appendOtherArtists(formData: FormData, artists: IArtist[]) {
  const payload: Payload = Object.fromEntries(formData);
  if (payload.otherArtists) {
    let otherArtistsIdArr: string[] = [];
    artists.forEach((el) => {
      if ((payload.otherArtists as string[]).includes(el.name)) {
        otherArtistsIdArr = [...otherArtistsIdArr, el._id];
      }
    });
    formData.delete("otherArtists");
    otherArtistsIdArr.forEach((artistId, index) => {
      formData.append(`otherArtists[${index}]`, artistId);
    });
  }
}

export async function createMusic(
  _prevState: CreateDataState | null,
  formData: FormData,
) {
  let errors: { [k: string]: string } = {};
  const payload: Payload = Object.fromEntries(formData); // this constant is just for validation

  const formDataKeys: string[] = Object.keys(Object.fromEntries(formData));

  // if any field is empty send error
  for (const value of formDataKeys) {
    if (String(payload[value]).length === 0 && value !== "otherArtists") {
      errors[value] = `${value} required!`;
      return { status: "error", errors: errors, values: payload };
    }
    // if otherArtists field is empty send error
    if (value === "otherArtists" && String(payload[value]).length === 0) {
      delete payload.otherArtists;
      formData.delete(value);
    }
  }

  payload.releaseYear = Number(payload.releaseYear);
  payload.categories = String(payload.categories).split(",");
  // set categories in formData
  appendCategories(formData, payload.categories);

  // set otherArtists in formData if exists
  if (payload.otherArtists) {
    if ((payload.otherArtists as string).search(",") < 0) {
      payload.otherArtists = [payload.otherArtists as string];
    } else {
      payload.otherArtists = (payload.otherArtists as string).split(",");
    }
  }

  // validate input data with zod
  const validationErrors = await validate(validateCreateMusic, payload);
  if (validationErrors) {
    return { status: "error", errors: validationErrors, values: payload };
  }

  try {
    const getArtistsResponse = await getAllArtists();

    // setting id of artist and otherArtists
    if (getArtistsResponse?.status === "success") {
      appendArtist(getArtistsResponse.data!, formData);
      appendOtherArtists(formData, getArtistsResponse.data!);

      const token = Cookies.get(AUTH_TOKEN_KEY);
      const res: AxiosResponse<ICreateMusicResponse> = await axios.post(
        `${API_BASE_URL}/music`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res?.data.status === "success") {
        return {
          status: "success",
          message: "music added successfully",
        };
      }
    }
  } catch (err) {
    const error = err as AxiosError<IApiError>;
    if (error) {
      console.log(error);
      return {
        status: error?.response?.data.status || "error",
        message:
          error?.response?.data.message || "something went wrong from server",
        values: payload,
      };
    }
  }
}

export async function editMusic(
  _prevState: CreateDataState | null,
  formData: FormData,
) {
  const api = new ApiRequests();
  const musicId = formData.get("musicId")?.toString();
  formData.delete("musicId");
  const artistsData: ResponseObject = await api.getAllData<IArtist>("artist");

  if (artistsData && artistsData.status === "success") {
    const categories = formData.get("categories")?.toString().split(",")!;
    const inputDataObject: FormValues = {
      name: formData.get("name") || "",
      artist:
        (artistsData as SuccessResponseObject<IArtist[]>).data.find(
          (artist) => artist.name === formData.get("artist"),
        )?._id || "",
      categories: categories[0] === "" ? [] : categories,
      genre: formData.get("genre") || "",
      otherArtists: formData.get("otherArtists")?.toString().split(",") || [],
      releaseYear: Number(formData.get("releaseYear")) ?? 0,
    };

    const validationErrors = await validate(validateEditMusic, inputDataObject);
    if (validationErrors)
      return {
        status: "error",
        errors: validationErrors,
        values: inputDataObject,
      };

    if ((formData.get("audioFileUrl") as File).name === "") {
      formData.delete("audioFileUrl");
    }
    if ((formData.get("coverImageUrl") as File).name === "") {
      formData.delete("coverImageUrl");
    }

    appendCategories(formData, inputDataObject.categories as string[]);
    appendArtist(artistsData.data, formData);
    appendOtherArtists(formData, artistsData.data);

    const res: ResponseObject = await api.updateDataById<IArtist, FormData>(
      "music",
      musicId as string,
      formData,
    );

    return {
      status: res?.status,
      message: res.message,
      values: inputDataObject,
    };
  } else {
    return { status: "error", message: "something went wrong from server" };
  }
}
