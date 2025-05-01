import {
  TableHead,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FILE_BASE_URL } from "~/utils/constants";
import IconButton from "~/components/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useReducer, useState } from "react";
import MusicTablePlayer from "./MusicTablePlayer";

import clsx from "clsx";
import MusicTableHead from "./MusicTableHead";
import MessageModal from "~/components/MessageModal";
import MusicTableActions from "./MusicTableActions";

type Props = { data: IMusic[] };

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

  const tableCellClasses = "border-b dark:!border-b-neutral-800";

  return (
    <div className="overflow-x-auto">
      <MuiTable>
        <MusicTableHead />
        {/* Table Body */}
        <TableBody>
          {data.map((music) => (
            // Table Row
            <TableRow key={music._id}>
              {/* Cover Image & player for playing song */}
              <TableCell className={clsx(tableCellClasses)}>
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
              <TableCell className={clsx(tableCellClasses)}>
                <Tag>{music.genre}</Tag>
              </TableCell>
              {/* Category */}
              <TableCell className={clsx(tableCellClasses)}>
                <div className="flex h-full w-full flex-wrap items-start justify-start gap-1">
                  {music.categories.map((category) => (
                    <Tag key={category}>{category}</Tag>
                  ))}
                </div>
              </TableCell>
              {/* Like Quantity */}
              <TableCell className={clsx(tableCellClasses, "!text-center")}>
                <span className="text-center text-neutral-900 dark:text-neutral-100">
                  {music.likeQuantity}
                </span>
              </TableCell>
              {/* Release Year */}
              <TableCell className={clsx(tableCellClasses, "!text-center")}>
                <span className="text-center text-neutral-900 italic dark:text-neutral-100">
                  {music.releaseYear}
                </span>
              </TableCell>
              {/* Artist Name */}
              <TableCell className={clsx(tableCellClasses)}>
                <span className="text-center text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {music.artist.name}
                </span>
              </TableCell>
              {/* Other artists */}
              <TableCell className={clsx(tableCellClasses)}>
                {music.otherArtists.length === 0
                  ? "-"
                  : music.otherArtists.map((artist) => (
                      <span
                        key={artist._id}
                        className="text-center text-xs text-neutral-900 italic dark:text-neutral-100"
                      >
                        {artist.name}
                      </span>
                    ))}
              </TableCell>
              {/* Actions (delete button & edit link) */}
              <MusicTableActions
                classes={tableCellClasses}
                musicId={music._id}
                musicName={music.name}
              />
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-neutral-200 p-1 dark:bg-neutral-700 dark:text-neutral-200">
      {children}
    </span>
  );
}

export default MusicTable;
