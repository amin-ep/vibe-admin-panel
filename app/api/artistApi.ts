import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_BASE_URL } from "~/utils/constants";
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

export async function createUpdateArtist(formData: FormData) {
  const isUpdating = formData.get("isUpdating") === "false" ? false : true;
  const api = new ApiRequests();

  if (isUpdating) {
    const artistId = formData.get("artistId")?.toString() || "";
    const res = api.updateDataById<IArtist>("artist", artistId, formData);
    return res;
  } else {
    const res = api.createData<IArtist>("artist", formData);
    return res;
  }
}
