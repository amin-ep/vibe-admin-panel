interface IStatus {
  status: string;
}

interface IApiError extends IStatus {
  message: string;
}

type GetDataResponse<T> = {
  status: string;
  data?: {
    document: T;
  };
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
type RequestError = { [k: string]: string };

type FormValues = {
  [k: string]: FormDataEntryValue | string | string[] | number;
};

type CreateDataState = {
  status: string;
  errors?: RequestError;
  message?: string;
  values?: FormValues;
} | null;

interface IUpdateDataResponse<T> {
  status: string;
  data: {
    document: T;
  };
}

type CategoryObject = {
  title: string;
  bgColorCode: string;
  textColorCode: string;
};

type Payload = FormValues;

type SuccessResponseObject<T> = {
  status: string;
  data: T;
  result?: number;
};

type ErrorResponseObject = {
  status: string;
  message: string;
};

type ResponseObject = ErrorResponseObject | SuccessResponseObject | undefined;
