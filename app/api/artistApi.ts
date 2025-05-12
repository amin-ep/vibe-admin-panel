import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_BASE_URL } from "~/utils/constants";
import { validate } from "~/utils/validate";
import { createArtistValidator } from "~/validators/artist-validators";
import ApiRequests from ".";

export async function getAllArtists() {
  try {
    const res: AxiosResponse<GetAllDataResponse<IArtist>> = await axios.get(
      `${API_BASE_URL}/artist`,
    );

    if (res.data.status === "success") {
      return { status: "success", data: res.data.data.docs };
    }
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

export async function createUpdateArtist(
  prevState: CreateDataState | null,
  formData: FormData,
) {
  let validationError:
    | {
        [k: string]: string;
      }
    | undefined;

  validationError = await validate<CreateArtistPayload>(
    createArtistValidator,
    Object.fromEntries(formData) as CreateArtistPayload,
  );

  if (validationError) {
    return { status: "error", errors: validationError };
  }

  let response: ResponseObject;

  const api = new ApiRequests();
  // return;
  const isUpdating = formData.get("isUpdating");
  const artistId = formData.get("artistId")?.toString();
  if (isUpdating === "false") {
    response = await api.createData<IArtist>("artist", formData);
  } else if (prevState && isUpdating === "true") {
    response = await api.updateDataById<UpdateArtistPayload, IArtist>(
      "artist",
      artistId as string,
      formData,
    );
  }
  console.log(response);
  if (response) {
    if (response?.status === "success") {
      return { status: "success" };
    } else {
      return { status: response?.status, data: response?.data };
    }
  } else {
    return { status: "error", message: "Something went wrong!" };
  }
}
