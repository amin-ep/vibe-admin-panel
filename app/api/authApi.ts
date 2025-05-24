import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { API_BASE_URL } from "~/utils/constants";

export async function login(payload: ILoginPayload) {
  try {
    const res: AxiosResponse<ILoginResponse, IApiError> = await axios.post(
      `${API_BASE_URL}/auth/login`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res;
  } catch (err) {
    const error = err as AxiosError<IApiError, ILoginResponse>;
    return error;
  }
}
