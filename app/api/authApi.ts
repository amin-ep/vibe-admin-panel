import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export async function login(payload: ILoginPayload) {
  try {
    const res: AxiosResponse<ILoginResponse, IApiError> = await axios.post(
      `${process.env.API_BASE_URL}/auth/login`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res?.status === 200) {
      if (res.data.data.user.role === "user") {
        return { status: "fail", message: "You are not allowed to login!" };
      }
      return { status: "success", data: res?.data };
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
