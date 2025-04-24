interface IStatus {
  status: string;
}

interface IApiError extends IStatus {
  message: string;
}
