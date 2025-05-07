import clsx from "clsx";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useTransition,
} from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ApiRequests from "~/api";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router";
import MessageModal from "~/components/MessageModal";
import { useArtist } from "~/contexts/ArtistContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styles from "./ArtistTableActions.module.css";
import IconLinkButton from "~/components/IconLinkButton/IconLinkButton";

type Props = { name: string; id: string; imageUrl?: string };

interface IState {
  modalIsOpen: boolean;
  message: string;
}

type Actions = { type: "open"; payload: string } | { type: "close" };

const initialState: IState = {
  message: "",
  modalIsOpen: false,
};
const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case "open":
      return { ...state, modalIsOpen: true, message: action.payload };
    case "close":
      return { ...state, modalIsOpen: false };

    default:
      throw new Error("Unknown action type");
  }
};

function ArtistTableActions({ name, id, imageUrl }: Props) {
  const [currentArtistIsUpdating, setCurrentArtistIsUpdating] = useState(false);
  const [isDeleting, startTransition] = useTransition();
  const [{ message, modalIsOpen }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const { isUpdating, startUpdating, endUpdating, artistData } = useArtist();

  const revalidator = useRevalidator();

  const handleOpenMessageModal = (artistName: string) => {
    dispatch({
      type: "open",
      payload: `Are you sure you wanna delete "${artistName}" ?`,
    });
  };

  const handleDeleteArtist = async (artistId: string) => {
    const api = new ApiRequests();
    startTransition(async () => {
      await api.deleteDataById("artist", artistId).then(() => {
        toast.success("Deleted successfully!");
        revalidator.revalidate();
        dispatch({ type: "close" });
      });
    });
  };

  const handleStartUpdating = () => {
    if (!isUpdating || !currentArtistIsUpdating) {
      startUpdating({ id, name, imageUrl });
    } else {
      endUpdating();
    }
  };

  useEffect(() => {
    setCurrentArtistIsUpdating(isUpdating && id === artistData?.id);
  }, [isUpdating, id, artistData]);

  const buttonExtraClasses = "hover:scale-[1.1] transition active:scale-[0.95]";

  return (
    <>
      <span className="flex flex-row gap-2">
        <IconLinkButton
          onClick={() => handleOpenMessageModal(name)}
          theme="secondary"
          variation="button"
          className={buttonExtraClasses}
        >
          <DeleteRoundedIcon />
        </IconLinkButton>

        <IconLinkButton
          theme="primary"
          onClick={handleStartUpdating}
          variation="button"
          className={clsx(
            buttonExtraClasses,
            currentArtistIsUpdating && styles.shake,
          )}
        >
          {currentArtistIsUpdating ? (
            <CloseRoundedIcon />
          ) : (
            <CreateRoundedIcon />
          )}
        </IconLinkButton>
      </span>
      {modalIsOpen && (
        <MessageModal
          action={() => handleDeleteArtist(id)}
          actionButtonTextContent="Delete"
          heading="Warning"
          isOpen={modalIsOpen}
          message={message}
          onClose={() => dispatch({ type: "close" })}
          isPending={isDeleting}
        />
      )}
    </>
  );
}

export default ArtistTableActions;
