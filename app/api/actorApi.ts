import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_BASE_URL } from "~/utils/constants";

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
