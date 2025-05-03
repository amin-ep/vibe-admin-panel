import axios, { AxiosError, type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "~/utils/constants";
import { validate } from "~/utils/validate";
import { validateCreateMusic } from "~/validators/music-validators";
import { getAllArtists } from "./actorApi";

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

export async function createMusic(
  _prevState: CreateDataState | null,
  formData: FormData,
) {
  let errors: { [k: string]: string } = {};

  const formDataObj: {
    [k: string]: string | FormDataEntryValue | number | string[];
  } = Object.fromEntries(formData); // this constant is just for validation

  const formDataKeys: string[] = Object.keys(Object.fromEntries(formData));

  // if any field is empty send error
  for (const value of formDataKeys) {
    if (String(formDataObj[value]).length === 0 && value !== "otherArtists") {
      errors[value] = `${value} required!`;
      return { status: "error", errors: errors };
    }
    // if otherArtists field is empty send error
    if (value === "otherArtists" && String(formDataObj[value]).length === 0) {
      delete formDataObj.otherArtists;
      formData.delete(value);
    }
  }

  formDataObj.releaseYear = Number(formDataObj.releaseYear);
  formDataObj.categories = String(formDataObj.categories).split(",");
  // set categories in formData
  formData.delete("categories");
  for (let i = 0; formDataObj.categories.length > i; i++) {
    formData.append(`categories[${i}]`, formDataObj.categories[i]);
  }

  // set otherArtists in formData if exists
  if (formDataObj.otherArtists) {
    if ((formDataObj.otherArtists as string).search(",") < 0) {
      formDataObj.otherArtists = [formDataObj.otherArtists as string];
    } else {
      formDataObj.otherArtists = (formDataObj.otherArtists as string).split(
        ",",
      );
    }
  }

  // validate input data with zod
  const validationErrors = await validate(validateCreateMusic, formDataObj);
  if (validationErrors) {
    return { status: "error", errors: validationErrors };
  }

  try {
    const getArtistsResponse = await getAllArtists();

    // setting id of artist and otherArtists
    if (getArtistsResponse?.status === "success") {
      const selectedArtistId = getArtistsResponse?.data?.find(
        (el) => el.name == formDataObj.artist,
      )?._id;
      formData.delete("artist");
      formData.append("artist", selectedArtistId as string);
      if (formDataObj.otherArtists) {
        let otherArtistsIdArr: string[] = [];
        getArtistsResponse.data?.forEach((el) => {
          if ((formDataObj.otherArtists as string[]).includes(el.name)) {
            otherArtistsIdArr = [...otherArtistsIdArr, el._id];
          }
        });
        formData.delete("otherArtists");
        otherArtistsIdArr.forEach((artistId, index) => {
          formData.append(`otherArtists[${index}]`, artistId);
        });
      }
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
      return {
        status: error?.response?.data.status || "fail",
        message:
          error?.response?.data.message || "something went wrong from server",
      };
    }
  }
}
