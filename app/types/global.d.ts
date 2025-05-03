interface IStatus {
  status: string;
}

interface IApiError extends IStatus {
  message: string;
}

type GetDataResponse<T> = {
  status: string;
  data?: T[];
  message?: undefined;
};

type GetAllDataResponse<T> = {
  status: string;
  result: number;
  data: {
    docs: T[];
  };
};

interface IFetcherResponse {
  status: string;
  message?: string;
  data?: ILoginResponse;
  errors?: { [k: string]: string };
}

interface ITableColumn {
  id: string;
  label: string;
  minWidth: number | string;
}

type Theme = "dark" | "light" | "system";

interface ICreateDataResponse<T> {
  status: string;
  data: {
    document: T[];
  };
}

type CreateDataState = {
  status: string;
  errors?: { [k: string]: string };
  message?: string;
} | null;
