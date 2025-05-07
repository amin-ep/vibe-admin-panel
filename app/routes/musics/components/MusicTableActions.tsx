import { TableCell } from "@mui/material";
import clsx from "clsx";
import IconButton from "~/components/IconLinkButton/IconLinkButton";

import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import MessageModal from "~/components/MessageModal";
import { toast } from "react-toastify";

type Props = { classes: string; musicName: string; musicId: string };

function MusicTableActions({ classes, musicId, musicName }: Props) {
  const [deleteWarningIsOpen, setDeleteWarningIsOpen] = useState(false);

  const handleCloseModal = () => setDeleteWarningIsOpen(false);

  const handleOpenModal = () => setDeleteWarningIsOpen(true);
  return (
    <>
      <TableCell className={clsx(classes)}>
        <div className="flex justify-center">
          {/* edit link */}
          <IconButton
            onClick={() => {
              console.log("edit");
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
          <IconButton onClick={handleOpenModal}>
            <DeleteRoundedIcon />
          </IconButton>
        </div>
      </TableCell>
      <MessageModal
        action={() => {
          console.log("delete");
          toast.error("Deleted successfully");
          handleCloseModal();
        }}
        heading={`Delete ${musicName}`}
        message={`Are you sure you wanna delete ${musicName}? this action is non returnable.`}
        actionButtonTextContent="Delete"
        isOpen={deleteWarningIsOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default MusicTableActions;
