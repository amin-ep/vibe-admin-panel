interface IAuth {
  isLoggedIn: boolean;
  user: null | IUser;
  login: (user: IUser) => void;
  logout: () => void;
}

interface ILoginPayload extends FormValues {
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
