import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "~/utils/constants";

class ApiRequests {
  private handleError(err: unknown) {
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
      return this.handleError(err);
    }
  }

  async getDataById<T>(
    route: string,
    id: string,
    token?: string,
    authorization?: boolean,
  ) {
    try {
      let authToken: string;

      if (!token) {
        authToken = this.getToken() as string;
      } else {
        authToken = token;
      }

      const res: AxiosResponse<GetDataResponse<T>, IApiError> = await axios.get(
        `${API_BASE_URL}/${route}/${id}`,
        {
          headers: authorization
            ? {
                Authorization: `Bearer ${authToken}`,
              }
            : undefined,
        },
      );
      if (res.data.status === "success")
        return { status: "success", data: res.data.data };
    } catch (err) {
      return this.handleError(err);
    }
  }

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
      return this.handleError(err);
    }
  }

  async updateDataById<T, S = unknown>(
    route: string,
    id: string,
    data: FormData | S,
  ) {
    try {
      const token = Cookies.get(AUTH_TOKEN_KEY);

      const res: AxiosResponse<IUpdateDataResponse<T>> = await axios.patch(
        `${API_BASE_URL}/${route}/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.status === 200) {
        return { status: "success", data: res.data.data.document };
      }
    } catch (err) {
      return this.handleError(err);
    }
  }

  async deleteDataById(route: string, id: string) {
    try {
      const token = Cookies.get(AUTH_TOKEN_KEY);

      const res = await axios.delete(`${API_BASE_URL}/${route}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 204) {
        return { status: "success", message: "Data deleted successfully!" };
      }
    } catch (err) {
      return this.handleError(err);
    }
  }
}

export default ApiRequests;
