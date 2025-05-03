import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "~/utils/constants";

class ApiRequests {
  async getAllData<T>(route: string) {
    try {
      const res: AxiosResponse<
        GetAllDataResponse<T>,
        IApiError
      > = await axios.get(`${process.env.API_BASE_URL}/${route}`);
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
        // return res?.data;
        return { status: "success", data: res.data.data.document };
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

  async updateDataById<T, S>() {}

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
