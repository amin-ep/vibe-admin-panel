import { Link } from "react-router";
import { FILE_BASE_URL } from "~/utils/constants";

type Props = { album: IAlbum };

function Card({ album }: Props) {
  return (
    <div className="relative aspect-square w-full rounded-lg shadow-md">
      <img
        src={`${FILE_BASE_URL}/${album.coverImageUrl}`}
        alt={`${album.name}-cover`}
        className="h-full w-full rounded-lg object-cover"
      />
      <div className="bg- absolute right-0 bottom-0 left-0 flex h-7/10 flex-col items-start justify-end gap-1 rounded-b-lg bg-gradient-to-t from-neutral-100 to-transparent p-2 dark:from-neutral-950">
        <p className="text-lg font-semibold text-neutral-950 md:text-xl dark:text-neutral-50">
          {album.name}
        </p>
        <p className="text-xs text-neutral-700 italic md:text-sm dark:text-neutral-200">
          {album.artist.name}
        </p>
        <p className="text-xs text-neutral-700 md:text-sm dark:text-neutral-200">
          {album.releaseYear}
        </p>

        <Link
          to={`/album/${album._id}`}
          className="mt-2 rounded-lg bg-blue-500 px-3 py-2 text-xs text-white sm:text-sm"
        >
          See Album
        </Link>
      </div>
    </div>
  );
}

export default Card;
