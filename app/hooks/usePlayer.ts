import { useCallback, useEffect, useRef, useState } from "react";

export function usePlayer(isPlaying: boolean) {
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

    if (isPlaying)
      playAnimationRef.current = requestAnimationFrame(updateProgress);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    if (!audioRef.current) return;

    // set duration of music
    setDuration(audioRef.current.duration);

    //
    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current!);
    }

    return () => {
      cancelAnimationFrame(playAnimationRef.current!);
    };
  }, [isPlaying, updateProgress]);

  const sliderOnChange = (
    _: Event | React.SyntheticEvent,
    val: number | number[],
  ) => {
    if (!audioRef.current) return;

    const newTime = Array.isArray(val) ? val[0] : val;
    setProgressTime(newTime);
    setIsSeeking(true);
  };

  const sliderOnChangeCommitted = (
    _e: Event | React.SyntheticEvent,
    val: number | number[],
  ) => {
    if (!audioRef.current) return;

    const newTime = Array.isArray(val) ? val[0] : val;
    audioRef.current.currentTime = newTime;
    setIsSeeking(false);

    if (isPlaying) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  return {
    duration,
    progressTime,
    sliderOnChange,
    sliderOnChangeCommitted,
    audioRef,
  };
}
