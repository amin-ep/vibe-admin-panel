import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { PlayingAction } from "./MusicTable";
import { FILE_BASE_URL } from "~/utils/constants";
import styles from "./MusicTablePlayer.module.css";
import { Slider } from "@mui/material";

type Props = {
  isPlaying: boolean;
  currentSongId: string;
  audioSrc: IMusic["audioFileUrl"];
  musicId: string;
  dispatch: React.ActionDispatch<[action: PlayingAction]>;
};

function MusicTablePlayer({
  isPlaying,
  currentSongId,
  audioSrc,
  musicId,
  dispatch,
}: Props) {
  const [currentAudioIsPlaying, setCurrentAudioIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [progressTime, setProgressTime] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const playAnimationRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // update progress time
  const updateProgress = useCallback(() => {
    if (!audioRef.current || isSeeking) return;

    const currentTime = audioRef.current.currentTime;
    setProgressTime(currentTime);

    if (currentAudioIsPlaying)
      playAnimationRef.current = requestAnimationFrame(updateProgress);
  }, [currentAudioIsPlaying, isSeeking]);

  // toggle playing
  const handlePlay = () => {
    if (!isPlaying) {
      dispatch({ type: "play", payload: musicId });
    } else {
      if (musicId === currentSongId) {
        dispatch({ type: "pause" });
      } else {
        dispatch({ type: "play", payload: musicId });
      }
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    // set duration of music
    setDuration(audioRef.current.duration);

    //
    if (currentAudioIsPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current!);
    }

    setCurrentAudioIsPlaying(musicId === currentSongId && isPlaying);

    return () => {
      cancelAnimationFrame(playAnimationRef.current!);
    };
  }, [
    isPlaying,
    currentSongId,
    updateProgress,
    musicId,
    currentAudioIsPlaying,
  ]);

  const handleSliderChange = (
    _: Event | React.SyntheticEvent,
    val: number | number[],
  ) => {
    if (!audioRef.current) return;

    const newTime = Array.isArray(val) ? val[0] : val;
    setProgressTime(newTime);
    setIsSeeking(true);
  };

  const handleSliderChangeCommitted = (
    _e: Event | React.SyntheticEvent,
    val: number | number[],
  ) => {
    if (!audioRef.current) return;

    const newTime = Array.isArray(val) ? val[0] : val;
    audioRef.current.currentTime = newTime;
    setIsSeeking(false);

    if (currentAudioIsPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  return (
    <div className="flex w-full flex-row items-center gap-2">
      <button
        onClick={handlePlay}
        className="h-6 w-8 rounded-md bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-900"
        aria-label={currentAudioIsPlaying ? "Pause" : "Play"}
      >
        {currentAudioIsPlaying ? (
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
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
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
