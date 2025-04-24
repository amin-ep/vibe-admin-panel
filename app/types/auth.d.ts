interface IAuth {
  isLoggedIn: boolean;
  user: null | IUser;
}

interface ILoginPayload {
  email?: IUser["email"];
  username?: IUser["username"];
  password: string;
}

interface ILoginResponse {
  status: string;
  token: string;
  data: {
    user: IUser;
  };
}
