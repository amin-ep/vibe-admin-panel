import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { FILE_BASE_URL } from "~/utils/constants";

import { usePaginate } from "~/hooks/usePaginate";
import ArtistTableActions from "./ArtistTableActions";
import ArtistTableHead from "./ArtistTableHead";

type Props = { artists: IArtist[] };

function ArtistsTable({ artists }: Props) {
  const {
    currentPageData: artistsData,
    isLastPage,
    page,
    nextPage,
    prevPage,
  } = usePaginate<IArtist>(artists, 6);

  const paginationBtnClasses =
    "rounded-md bg-blue-500 p-2 px-4 text-white disabled:bg-neutral-300 disabled:text-neutral-900 dark:disabled:bg-neutral-800";
  return (
    <div>
      <TableContainer sx={{ maxHeight: 497 }}>
        <Table stickyHeader>
          <ArtistTableHead />
          <TableBody>
            {artistsData?.map((artist) => (
              <TableRow key={artist._id}>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0.75rem",
                    borderBottom: "none",
                  }}
                >
                  <img
                    src={
                      artist.imageUrl
                        ? `${FILE_BASE_URL}/${artist.imageUrl}`
                        : "/artist-image-placeholder.png"
                    }
                    alt={artist.name}
                    className="aspect-square w-14 rounded-full"
                  />
                  <span className="text-neutral-800 dark:text-neutral-200">
                    {artist.name}
                  </span>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "none",
                  }}
                >
                  <ArtistTableActions
                    name={artist.name}
                    id={artist._id}
                    imageUrl={artist.imageUrl}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="my-2 flex flex-row items-center gap-3">
        <button
          onClick={prevPage}
          className={paginationBtnClasses}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="flex w-5 items-center justify-center">{page}</span>
        <button
          onClick={nextPage}
          className={paginationBtnClasses}
          disabled={isLastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArtistsTable;
