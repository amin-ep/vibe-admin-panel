import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Slider } from "@mui/material";
import { useState } from "react";
import { usePlayer } from "~/hooks/usePlayer";
import { FILE_BASE_URL } from "~/utils/constants";
import styles from "./MusicTablePlayer.module.css";

type Props = {
  currentSongId: string;
  audioSrc: IMusic["audioFileUrl"];
  musicId: string;
  setCurrentSongId: React.Dispatch<React.SetStateAction<string>>;
};

function MusicTablePlayer({
  currentSongId,
  audioSrc,
  musicId,
  setCurrentSongId,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    duration,
    audioRef,
    progressTime,
    sliderOnChange,
    sliderOnChangeCommitted,
  } = usePlayer(isPlaying && currentSongId === musicId);

  const togglePlay = () => {
    if (currentSongId !== musicId) setCurrentSongId(musicId);

    setIsPlaying((state) => !state);
  };

  return (
    <div className="flex w-full flex-row items-center gap-2">
      <button
        onClick={togglePlay}
        className="h-6 w-8 rounded-md bg-blue-100 text-blue-900 dark:bg-blue-500 dark:text-blue-100"
        aria-label={musicId === currentSongId && isPlaying ? "Pause" : "Play"}
      >
        {musicId === currentSongId && isPlaying ? (
          <PauseRoundedIcon fontSize="small" />
        ) : (
          <PlayArrowRoundedIcon fontSize="small" />
        )}
      </button>
      <audio ref={audioRef} src={`${FILE_BASE_URL}/${audioSrc}`} />
      <div className="w-full">
        <Slider
          aria-label="Progress Time"
          value={progressTime || 0}
          max={duration || 0}
          min={0}
          onChange={sliderOnChange}
          onChangeCommitted={sliderOnChangeCommitted}
          classes={{
            root: styles.slider,
            thumb: styles.thumb,
            track: styles.track,
            marked: styles.marked,
            rail: styles.rail,
          }}
          sx={{
            "& .MuiSlider-thumb": {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
}

export default MusicTablePlayer;
