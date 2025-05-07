import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "~/utils/constants";

class ApiRequests {
  private handleError(err: unknown) {
    const error = err as AxiosError<IApiError>;
    if (error) {
      return {
        status: error?.response?.data.status || "error",
        message:
          error?.response?.data.message || "something went wrong from server",
      };
    }
  }
  private getToken() {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    return token;
  }
  async getAllData<T>(route: string, token?: string) {
    try {
      let authToken: string;
      if (!token) {
        authToken = this.getToken() as string;
      } else {
        authToken = token;
      }
      const res: AxiosResponse<
        GetAllDataResponse<T>,
        IApiError
      > = await axios.get(`${API_BASE_URL}/${route}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.data.status === "success")
        return { status: "success", data: res.data.data.docs };
    } catch (err) {
      this.handleError(err);
    }
  }

  async getDataById<T>(route: string, id: string) {}

  async createData<T>(route: string, data: FormData) {
    try {
      const token = Cookies.get(AUTH_TOKEN_KEY);
      const res: AxiosResponse<ICreateDataResponse<T>> = await axios.post(
        `${API_BASE_URL}/${route}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.status === 201) {
        return { status: "success", data: res.data.data.document };
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  async updateDataById<T, S>(route: string, id: string, data: FormData | T) {
    try {
      const token = Cookies.get(AUTH_TOKEN_KEY);

      const res: AxiosResponse<IUpdateDataResponse<S>> = await axios.patch(
        `${API_BASE_URL}/${route}/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.status === 200)
        return { status: "success", data: res.data.data.document };
    } catch (err) {}
  }

  async deleteDataById(route: string, id: string) {
    try {
      const token = Cookies.get(AUTH_TOKEN_KEY);

      const res = await axios.delete(`${API_BASE_URL}/${route}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
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
}

export default ApiRequests;
