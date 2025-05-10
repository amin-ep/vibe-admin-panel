import { TableCell } from "@mui/material";
import clsx from "clsx";
import IconButton from "~/components/IconLinkButton/IconLinkButton";

import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import { toast } from "react-toastify";
import MessageModal from "~/components/MessageModal";

type Props = { classes: string; musicName: string; musicId: string };

function MusicTableActions({ classes, musicId, musicName }: Props) {
  const [deleteWarningIsOpen, setDeleteWarningIsOpen] = useState(false);

  const handleCloseModal = () => setDeleteWarningIsOpen(false);

  const handleOpenModal = () => setDeleteWarningIsOpen(true);

  const btnClasses = "border border-neutral-200 dark:border-neutral-800";
  return (
    <>
      <TableCell className={clsx(classes)}>
        <div className="flex items-center gap-1.5">
          {/* edit link */}
          <IconButton
            onClick={handleOpenModal}
            theme="transparent"
            className={btnClasses}
          >
            <DeleteRoundedIcon />
          </IconButton>
          {/* Delete Button */}
          <IconButton
            variation="link"
            theme="transparent"
            className={btnClasses}
          >
            <CreateRoundedIcon />
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
