export const getServerAuthToken = (request: Request) => {
  const cookies = Object.fromEntries(request.headers).cookie;
  const key = process.env.AUTH_TOKEN_KEY;
  const authToken = cookies
    .split(" ")
    .find((el) => el.split("=")[0] === key)
    ?.split("=")[1];
  return authToken;
};
