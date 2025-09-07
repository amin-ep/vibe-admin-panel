import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router";
import { getMe } from "~/api/userApi";
import { AUTH_TOKEN_KEY, THEME_KEY } from "~/utils/constants";

interface IContext {
  isLoggedIn: boolean;
  userdata: null | IUser;
  login: (p: IUser) => void;
  logout: () => void;
}

interface IState {
  isLoggedIn: boolean;
  userdata: null | IUser;
}

type Actions =
  | { type: "login"; payload: IUser }
  | { type: "logout" }
  | { type: "userdata"; payload: IUser }
  | { type: "setLoggedIn" };

const AuthContext: React.Context<IContext> = createContext({
  isLoggedIn: false,
  userdata: null,
  login(_p: IUser) {},
} as IContext);

const initialState: IState = {
  isLoggedIn: false,
  userdata: null,
};

const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case "login":
      return { ...state, isLoggedIn: true, userdata: action.payload };

    case "userdata":
      return { ...state, userdata: action.payload };

    case "logout":
      return { ...state, userdata: null, isLoggedIn: false };

    case "setLoggedIn":
      return { ...state, isLoggedIn: false };
    default:
      throw new Error("Unknown action type!");
  }
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ isLoggedIn, userdata }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const navigate = useNavigate();

  const login = (payload: IUser) => {
    dispatch({ type: "login", payload });
  };

  const logout = () => {
    dispatch({ type: "logout" });
    Cookies.remove(AUTH_TOKEN_KEY);
    localStorage.removeItem(THEME_KEY);
    navigate("/login");
  };

  const authToken = Cookies.get(AUTH_TOKEN_KEY);
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    } else {
      getMe().then((res) => {
        if (res?.status === "success") {
          dispatch({ type: "login", payload: res.data as IUser });
        } else {
          navigate('/login')
        }
      });
    }
  }, []);

  return (
    <AuthContext value={{ isLoggedIn, login, logout, userdata }}>
      {children}
    </AuthContext>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must use inside the AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
