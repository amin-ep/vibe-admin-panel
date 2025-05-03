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

export async function createArtist(
  _prevState: CreateDataState | null,
  formData: FormData,
) {
  const validationError = await validate<CreateArtistPayload>(
    createArtistValidator,
    Object.fromEntries(formData) as CreateArtistPayload,
  );

  if (validationError) {
    return { status: "error", errors: validationError };
  }

  const api = new ApiRequests();
  const res = await api.createData("artist", formData);

  if (res?.status === "success") {
    return { status: "success" };
  }
}
