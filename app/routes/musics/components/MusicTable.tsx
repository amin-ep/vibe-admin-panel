import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useReducer } from "react";
import { FILE_BASE_URL } from "~/utils/constants";
import MusicTablePlayer from "./MusicTablePlayer";

import clsx from "clsx";
import TableHead from "~/components/TableHead";
import MusicTableActions from "./MusicTableActions";

type Props = { data: IMusic[] };

const columns: ITableColumn[] = [
  { id: "c1", label: "Song", minWidth: 300 },
  { id: "c2", label: "Genre", minWidth: 105 },
  { id: "c3", label: "Categories", minWidth: 250 },
  { id: "c4", label: "Likes", minWidth: 70 },
  { id: "c5", label: "Release Year", minWidth: 120 },
  { id: "c6", label: "Artist", minWidth: 120 },
  { id: "c7", label: "FT By", minWidth: 120 },
  { id: "c8", label: "Actions", minWidth: 150 },
];

interface IState {
  isPlaying: boolean;
  currentSongId: string;
}

export type PlayingAction =
  | { type: "play"; payload: string }
  | { type: "pause" };

const initialState: IState = {
  isPlaying: false,
  currentSongId: "",
};

const reducer = (state: IState, action: PlayingAction) => {
  switch (action.type) {
    case "play":
      return { ...state, isPlaying: true, currentSongId: action.payload };

    case "pause":
      return { ...state, isPlaying: false };

    default:
      throw new Error("Unknown action type!");
  }
};

function MusicTable({ data }: Props) {
  const [{ isPlaying, currentSongId }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead columns={columns} />
        {/* Table Body */}
        <TableBody>
          {data.map((music) => (
            // Table Row
            <TableRow key={music._id}>
              {/* Cover Image & player for playing song */}
              <TableCell className={clsx("table-cell-classes")}>
                <div className="flex items-center justify-start gap-2">
                  <img
                    className="aspect-square w-14 rounded-md"
                    src={`${FILE_BASE_URL}/${music.coverImageUrl}`}
                    alt={music.name}
                  />
                  <div className="text-neutral flex h-full w-full flex-col gap-1">
                    <span className="dark:text-neutral-100">{music.name}</span>
                    <MusicTablePlayer
                      isPlaying={isPlaying}
                      currentSongId={currentSongId}
                      audioSrc={music.audioFileUrl}
                      musicId={music._id}
                      dispatch={dispatch}
                    />
                  </div>
                </div>
              </TableCell>
              {/* Genre */}
              <TableCell className={clsx("table-cell-classes")}>
                <Tag>{music.genre}</Tag>
              </TableCell>
              {/* Category */}
              <TableCell className={clsx("table-cell-classes")}>
                <div className="flex h-full w-full flex-wrap items-start justify-start gap-1">
                  {music.categories.map((category) => (
                    <Tag key={category}>{category}</Tag>
                  ))}
                </div>
              </TableCell>
              {/* Like Quantity */}
              <TableCell className={clsx("table-cell-classes", "!text-center")}>
                {music.likeQuantity}
              </TableCell>
              {/* Release Year */}
              <TableCell
                className={clsx("table-cell-classes", "!text-center italic")}
              >
                {music.releaseYear}
              </TableCell>
              {/* Artist Name */}
              <TableCell
                className={clsx("table-cell-classes", "text-sm font-semibold")}
              >
                {music.artist.name}
              </TableCell>
              {/* Other artists */}
              <TableCell
                className={clsx(
                  "table-cell-classes",
                  "text-center !text-xs italic",
                )}
              >
                {music.otherArtists.length === 0
                  ? "-"
                  : music.otherArtists.map((artist) => (
                      <React.Fragment key={artist._id}>
                        {artist.name}
                      </React.Fragment>
                    ))}
              </TableCell>
              {/* Actions (delete button & edit link) */}
              <MusicTableActions
                classes={"table-cell-classes"}
                musicId={music._id}
                musicName={music.name}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "rounded-lg bg-neutral-200 p-1 px-2 dark:bg-neutral-800 dark:text-neutral-400",
      )}
    >
      {children}
    </span>
  );
}

export default MusicTable;
