import clsx from "clsx";
import React, { useReducer, useTransition } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ApiRequests from "~/api";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router";
import MessageModal from "~/components/MessageModal";

type Props = { name: string; id: string };

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

function ArtistTableActions({ name, id }: Props) {
  const [isDeleting, startTransition] = useTransition();
  const [{ message, modalIsOpen }, dispatch] = useReducer(
    reducer,
    initialState,
  );
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
  return (
    <>
      <span className="flex flex-row gap-1">
        <ActionButton
          onClick={() => handleOpenMessageModal(name)}
          className="bg-rose-600 text-white hover:bg-rose-800"
        >
          <DeleteRoundedIcon />
        </ActionButton>
        <ActionButton
          onClick={() => console.log("edit")}
          className="bg-blue-500 text-white hover:bg-blue-800"
        >
          <CreateRoundedIcon />
        </ActionButton>
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

function ActionButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "aspect-square w-10 rounded-lg transition hover:scale-[1.1] active:scale-[0.95]",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ArtistTableActions;
