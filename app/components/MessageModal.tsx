import { Box, Modal } from "@mui/material";
import Button from "./Button";

type Props = {
  action: () => void;
  isOpen: boolean;
  onClose: () => void;
  heading: string;
  message: string;
  actionButtonTextContent: string;
  isPending?: boolean;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MessageModal({
  action,
  isOpen,
  onClose,
  heading,
  message,
  actionButtonTextContent,
  isPending,
}: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className="container flex w-100 flex-col items-center gap-4 rounded-lg bg-white p-5 text-center outline-none md:gap-6 md:p-8 dark:bg-neutral-900">
        <img
          src="/icons/dialog-warning-symbolic.svg"
          alt="error"
          className="aspect-square w-15 max-w-[95%] md:w-20"
        />
        <h2 className="text-xl font-semibold text-neutral-950 md:text-2xl dark:text-neutral-200">
          {heading}
        </h2>
        <p className="text-xs text-neutral-600 md:text-sm dark:text-neutral-400">
          {message}
        </p>
        <div className="flex w-full items-center justify-center gap-2">
          <Button onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button onClick={action} variation="secondary" className="w-full">
            {isPending ? "Loading..." : actionButtonTextContent}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default MessageModal;
