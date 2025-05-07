import { createContext, useContext, useReducer } from "react";
import { AuthProvider } from "./AuthContext";

type ArtistData = { id: string; name: string; imageUrl?: string };

interface IArtistContext {
  artistData: null | ArtistData;
  isUpdating: boolean;
  startUpdating: (artist: ArtistData) => void;
  endUpdating: () => void;
}

const ArtistContext: React.Context<IArtistContext> = createContext({
  artistData: null,
  isUpdating: false,
} as IArtistContext);

interface IState {
  artistData: null | ArtistData;
  isUpdating: boolean;
}

type Actions =
  | { type: "startUpdating"; payload: ArtistData }
  | { type: "endUpdating" };

const initialState: IState = {
  artistData: null,
  isUpdating: false,
};

const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case "startUpdating":
      return { ...state, isUpdating: true, artistData: action.payload };

    case "endUpdating":
      return { ...state, isUpdating: false, artistData: null };

    default:
      throw new Error("Unknown action type!");
  }
};

export function ArtistProvider({ children }: { children: React.ReactNode }) {
  const [{ artistData, isUpdating }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const startUpdating = (artist: ArtistData) => {
    dispatch({ type: "startUpdating", payload: artist });
  };

  const endUpdating = () => {
    dispatch({ type: "endUpdating" });
  };

  return (
    <ArtistContext
      value={{ isUpdating, artistData, startUpdating, endUpdating }}
    >
      {children}
    </ArtistContext>
  );
}

export const useArtist = () => {
  const context = useContext(ArtistContext);

  if (!context) {
    throw new Error("useArtist must use inside the ArtistContext");
  }

  return context;
};
