import {
  TableHead,
  Table as MuiTable,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FILE_BASE_URL } from "~/utils/constants";
import styles from "./MusicTable.module.css";
import IconButton from "~/components/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useReducer } from "react";
import MusicTablePlayer from "./MusicTablePlayer";
import { useTheme } from "~/hooks/useTheme";

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

const columns: ITableColumn[] = [
  { id: "c1", label: "Song", minWidth: 300 },
  { id: "c2", label: "Genre", minWidth: 95 },
  { id: "c3", label: "Categories", minWidth: 270 },
  { id: "c4", label: "Likes", minWidth: 70 },
  { id: "c5", label: "Release Year", minWidth: 120 },
  { id: "c6", label: "Artist", minWidth: 120 },
  { id: "c7", label: "FT By", minWidth: 120 },
  { id: "c8", label: "Actions", minWidth: 80 },
];

function MusicTable({ data }: Props) {
  const [{ isPlaying, currentSongId }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="overflow-x-auto">
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{ minWidth: col.minWidth, borderBottom: "none" }}
              >
                <span className="text-neutral-800 dark:text-neutral-400">
                  {col.label}
                </span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          classes={{
            root: styles.tbody,
          }}
        >
          {data.map((music) => (
            <TableRow key={music._id}>
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
              >
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
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
              >
                <Tag>{music.genre}</Tag>
              </TableCell>
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
              >
                <div className="flex h-full w-full flex-wrap items-start justify-start gap-1">
                  {music.categories.map((category) => (
                    <Tag key={category}>{category}</Tag>
                  ))}
                </div>
              </TableCell>
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
                sx={{ textAlign: "center" }}
              >
                <span className="text-center text-neutral-900 dark:text-neutral-100">
                  {music.likeQuantity}
                </span>
              </TableCell>
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
                sx={{ textAlign: "center" }}
              >
                <span className="text-center text-neutral-900 italic dark:text-neutral-100">
                  {music.releaseYear}
                </span>
              </TableCell>
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
              >
                <span className="text-center text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {music.artist.name}
                </span>
              </TableCell>
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
              >
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
              <TableCell
                classes={{
                  root: styles["table-cell"],
                }}
              >
                <div className="flex justify-center">
                  <IconButton
                    onClick={() => {
                      console.log("edit");
                    }}
                  >
                    <CreateRoundedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      console.log("delete");
                    }}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                </div>
              </TableCell>
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
