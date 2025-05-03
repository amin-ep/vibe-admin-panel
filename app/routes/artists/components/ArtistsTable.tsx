import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { FILE_BASE_URL } from "~/utils/constants";

import ArtistTableActions from "./ArtistTableActions";
import ArtistTableHead from "./ArtistTableHead";

type Props = { artists: IArtist[] };

function ArtistsTable({ artists }: Props) {
  return (
    <div>
      <Table>
        <ArtistTableHead />
        <TableBody>
          {artists.map((artist) => (
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
                <ArtistTableActions name={artist.name} id={artist._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ArtistsTable;
