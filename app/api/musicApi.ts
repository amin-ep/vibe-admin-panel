import axios, { AxiosError, type AxiosResponse } from "axios";

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
