import axios, { AxiosError, type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "~/utils/constants";

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

export async function getMusicStats(token?: string) {
  try {
    let authToken: string;
    if (!token) {
      authToken = Cookies.get(AUTH_TOKEN_KEY) as string;
    } else {
      authToken = token;
    }
    const res: AxiosResponse<IGetMusicStatsResponse> = await axios.get(
      `${API_BASE_URL}/music/stats`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (res.status === 200) {
      return { status: "success", data: res.data.data };
    }
  } catch (err) {
    const error = err as AxiosError<IApiError>;
    console.log(error);
    if (error) {
      return {
        status: error?.response?.data.status || "error",
        message:
          error?.response?.data.message || "something went wrong from server",
      };
    }
  }
}
