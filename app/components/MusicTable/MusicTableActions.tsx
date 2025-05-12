import { TableCell } from "@mui/material";
import clsx from "clsx";
import IconButton from "~/components/IconLinkButton/IconLinkButton";

import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import MessageModal from "~/components/MessageModal";
import ApiRequests from "~/api";
import { useRevalidator } from "react-router";

type Props = { classes: string; musicName: string; musicId: string };

function MusicTableActions({ classes, musicId, musicName }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deleteWarningIsOpen, setDeleteWarningIsOpen] = useState(false);

  const revalidator = useRevalidator();

  const handleCloseModal = () => setDeleteWarningIsOpen(false);

  const handleOpenModal = () => setDeleteWarningIsOpen(true);

  const btnClasses = "border border-neutral-200 dark:border-neutral-800";

  const handleDeleteMusic = async () => {
    startTransition(async () => {
      const api = new ApiRequests();

      const res = await api.deleteDataById("music", musicId);
      if (res?.status === "success") {
        revalidator.revalidate().then(() => {
          handleCloseModal();
        });
      }
    });
  };

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
            to={`/edit-music/${musicId}`}
          >
            <CreateRoundedIcon />
          </IconButton>
        </div>
      </TableCell>
      <MessageModal
        action={handleDeleteMusic}
        heading={`Delete ${musicName}`}
        message={`Are you sure you wanna delete ${musicName}? this action is non returnable.`}
        actionButtonTextContent="Delete"
        isOpen={deleteWarningIsOpen}
        onClose={handleCloseModal}
        isPending={isPending}
      />
    </>
  );
}

export default MusicTableActions;
