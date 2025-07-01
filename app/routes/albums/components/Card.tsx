import { useState, useTransition } from "react";
import { Link, useRevalidator } from "react-router";
import ApiRequests from "~/api";
import MessageModal from "~/components/MessageModal";
import { FILE_BASE_URL } from "~/utils/constants";

type Props = { album: IAlbum };

function Card({ album }: Props) {
  const [isPending, startTransition] = useTransition();
  const [deleteWarningIsOpen, setDeleteWarningIsOpen] = useState(false);

  const revalidator = useRevalidator();

  const handleDeleteAlbum = () => {
    startTransition(async () => {
      const api = new ApiRequests();
      const res: ResponseObject = await api.deleteDataById("album", album._id);
      if (res.status === "success") {
        revalidator.revalidate();
        setDeleteWarningIsOpen(false);
      }
    });
  };

  const linkClasses =
    "rounded-lg dark:bg-white/10 py-2 text-xs bg-black/10 hover:bg-black/35 dark:text-white sm:text-sm text-center dark:hover:bg-white/30 transition";
  const albumArtists = album.artists.map((artist) => artist.name);
  return (
    <div className="relative aspect-square w-full rounded-lg shadow-md">
      <img
        src={`${FILE_BASE_URL}/${album.coverImageUrl}`}
        alt={`${album.name}-cover`}
        className="h-full w-full rounded-lg object-cover"
      />
      <div className="absolute right-0 bottom-0 left-0 flex h-7/10 flex-col items-start justify-end gap-1 rounded-b-lg bg-gradient-to-t from-neutral-100/70 to-transparent p-2 dark:from-neutral-950">
        <p className="text-lg font-semibold text-neutral-950 md:text-xl dark:text-neutral-50">
          {album.name}
        </p>
        <p className="text-xs text-neutral-700 italic md:text-sm dark:text-neutral-200">
          {albumArtists.length === 1 ? albumArtists : albumArtists.join(" FT ")}
        </p>
        <p className="text-xs text-neutral-700 md:text-sm dark:text-neutral-200">
          {album.releaseYear}
        </p>

        <div className="mt-2 grid w-full grid-cols-3 gap-1">
          <Link to={`/album/${album._id}`} className={linkClasses}>
            Info
          </Link>
          <Link className={linkClasses} to={`/edit-album/${album._id}`}>
            Edit
          </Link>
          <button
            className={linkClasses}
            onClick={() => setDeleteWarningIsOpen(true)}
          >
            Delete
          </button>
          <MessageModal
            action={handleDeleteAlbum}
            isPending={isPending}
            isOpen={deleteWarningIsOpen}
            heading={`Delete ${album.name}`}
            message="This delete action is not returnable"
            actionButtonTextContent="Delete"
            onClose={() => setDeleteWarningIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
