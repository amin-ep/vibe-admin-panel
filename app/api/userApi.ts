import axios, { AxiosError, type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "~/utils/constants";

export async function getMe() {
  try {
    const token = Cookies.get(AUTH_TOKEN_KEY as string);
    const res: AxiosResponse<IGetMeResponse, IApiError> = await axios.get(
      `${API_BASE_URL}/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      return { status: "success", data: res.data.data.document };
    }
  } catch (err) {
    const error = err as AxiosError<IApiError>;
    console.log(error);
    if (error) {
      return {
        status: "fail",
        message: error.response?.data.message || "Something went wrong!",
      };
    }
  }
}
