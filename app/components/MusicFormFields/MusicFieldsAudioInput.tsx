import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import clsx from "clsx";
import { useState } from "react";
import { FILE_BASE_URL } from "~/utils/constants";
import FormErrorText from "../FormErrorText";
import FormLabel from "../FormLabel";
import TrashButton from "../TrashButton";
import MusicFormFieldsPlayer from "./MusicFormFieldsPlayer";

type Props = {
  errorMessage?: string;
  className?: string;
  defaultAudioSrc?: string;
};

function MusicFieldsAudioInput({
  errorMessage,
  className,
  defaultAudioSrc,
}: Props) {
  const initializeState = () => {
    if (defaultAudioSrc) {
      return `${FILE_BASE_URL}/${defaultAudioSrc}`;
    } else {
      return null;
    }
  };
  const [selectedAudio, setSelectedAudio] = useState<File | null | string>(
    initializeState,
  );

  const onAudioUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedAudio(e.target.files[0]);
    }
  };

  return (
    <div className={clsx("relative flex flex-col gap-1.5 md:gap-2", className)}>
      <div className="flex flex-row items-center justify-between">
        <FormLabel label="Audio File" />
        {selectedAudio && (
          <TrashButton onClick={() => setSelectedAudio(null)} />
        )}
      </div>

      <div
        className={clsx(
          "relative flex items-center justify-center gap-1.5 rounded-md text-xs text-neutral-500 md:text-sm dark:border-neutral-700 dark:bg-neutral-900",
          !selectedAudio &&
            "border border-neutral-300 bg-neutral-100 py-1 md:py-2.5",
        )}
      >
        {!selectedAudio ? (
          <>
            <span>Click To Upload</span>
            <AudioFileRoundedIcon />
          </>
        ) : (
          <MusicFormFieldsPlayer audioSrc={selectedAudio} />
        )}
        <input
          type="file"
          name="audioFileUrl"
          className="absolute z-1 opacity-0"
          onChange={onAudioUrlInputChange}
          id="music-audio-input"
        />{" "}
      </div>
      {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
    </div>
  );
}

export default MusicFieldsAudioInput;
