import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export async function getAllArtists() {
  try {
    const res: AxiosResponse<
      GetAllDataResponse<IArtist>,
      IApiError
    > = await axios.get(`${process.env.API_BASE_URL}/artist`);
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
