import { Slider } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { usePlayer } from "~/hooks/usePlayer";
import IconLinkButton from "../IconLinkButton/IconLinkButton";
import styles from "./FieldsAudioPlayer.module.css";

// icons
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { FILE_BASE_URL } from "~/utils/constants";
type Props = { audioSrc: File | string; onDelete: () => void };

function FieldsAudioPlayer({ audioSrc, onDelete }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    audioRef,
    duration,
    progressTime,
    sliderOnChange,
    sliderOnChangeCommitted,
  } = usePlayer(isPlaying);

  const togglePlaying = useCallback(() => {
    setIsPlaying((state) => !state);
  }, []);

  const audioFile = useMemo(() => {
    if (audioSrc instanceof File) {
      return URL.createObjectURL(audioSrc as File);
    } else {
      return `${FILE_BASE_URL}/${audioSrc}`;
    }
  }, [audioSrc]);

  return (
    <div className="flex h-9 w-full items-center gap-4 rounded-lg bg-neutral-100 md:h-11 dark:bg-neutral-800">
      <audio ref={audioRef} src={audioFile} />
      <IconLinkButton className="!ring-0" onClick={togglePlaying}>
        {!isPlaying ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
      </IconLinkButton>
      <Slider
        key={progressTime}
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
      <button
        type="button"
        className="aspect-square h-full rounded-r-md bg-rose-500 text-white hover:bg-rose-700"
        onClick={onDelete}
      >
        <ClearRoundedIcon />
      </button>
    </div>
  );
}

export default FieldsAudioPlayer;
