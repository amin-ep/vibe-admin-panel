import { AUTH_TOKEN_KEY } from "./constants";

export const getServerAuthToken = (request: Request) => {
  const value = `; ${Object.fromEntries(request.headers).cookie}`;
  const parts = value.split(`; ${AUTH_TOKEN_KEY}=`);
  if (parts.length == 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
};

export const textExpander = (text: string, breakIndex: number) => {
  return text.length > breakIndex ? `${text.slice(0, breakIndex)}...` : text;
};
