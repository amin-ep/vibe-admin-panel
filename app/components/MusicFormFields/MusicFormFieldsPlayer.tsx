import { Slider } from "@mui/material";
import { useState } from "react";
import { usePlayer } from "~/hooks/usePlayer";
import styles from "./MusicFormFieldsPlayer.module.css";
import IconLinkButton from "../IconLinkButton/IconLinkButton";

// icons
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
type Props = { audioSrc: File | string };

function MusicFormFieldsPlayer({ audioSrc }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    audioRef,
    duration,
    progressTime,
    sliderOnChange,
    sliderOnChangeCommitted,
  } = usePlayer(isPlaying);

  return (
    <div className="flex w-full items-center gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
      <audio
        ref={audioRef}
        src={
          audioSrc instanceof File
            ? URL.createObjectURL(audioSrc as File)
            : audioSrc
        }
      />
      <IconLinkButton
        className="!ring-0"
        onClick={() => setIsPlaying((state) => !state)}
      >
        {!isPlaying ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
      </IconLinkButton>
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
        size="small"
      />
      <label
        htmlFor="music-audio-input"
        className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-r-lg bg-transparent hover:text-blue-500"
      >
        <BackupRoundedIcon />
      </label>
    </div>
  );
}

export default MusicFormFieldsPlayer;
