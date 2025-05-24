import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { useSelectBoxArray } from "~/hooks/useSelectBoxArray";
import { genresArr } from "~/utils/constants";
import {
  maxLengthErrorMessage,
  minLengthErrorMessage,
  requiredErrorMessage,
} from "~/utils/fieldErrorMessage";
import CategoriesController from "../CategoriesController";
import FormControl from "../FormControl";
import ImageDropzone from "../ImageDropzone/ImageDropzone";
import SelectBox from "../SelectBox/SelectBox";
import AudioDropzone from "./AudioDropzone";
import styles from "./MusicFormFields.module.css";

export interface IMusicFields extends IMusicPayload, FieldValues {}

function MusicFormFields({
  artists,
  musicData,
  register,
  errors,
  control,
}: {
  artists: IArtist[];
  musicData?: IMusic;
  register: UseFormRegister<IMusicFields>;
  errors: FieldErrors<IMusicFields>;
  control: Control<IMusicFields>;
}) {
  const artistsArr = useSelectBoxArray(artists as IArtist[]);
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles["grid-container"]}>
      {/* NAME */}
      <FormControl
        name="name"
        id="add-music-name"
        label="Name"
        placeholder="Name"
        type="text"
        controllerClassName={styles["name-controller"]}
        register={register}
        registerOptions={{
          required: {
            value: true,
            message: requiredErrorMessage("Name"),
          },
          minLength: {
            value: 2,
            message: minLengthErrorMessage("Name", 2),
          },
          maxLength: {
            value: 35,
            message: maxLengthErrorMessage("Name", 35),
          },
        }}
        error={errors.name?.message}
      />

      {/* AUDIO */}
      <AudioDropzone
        control={control}
        wrapperClassName={styles["audio-controller"]}
        errorMessage={errors.audioFileUrl?.message}
        rules={{
          required: {
            value: true,
            message: requiredErrorMessage("Cover Image"),
          },
        }}
        defaultSrc={musicData?.audioFileUrl}
      />

      {/* COVER IMAGE */}
      <ImageDropzone
        control={control}
        name="coverImageUrl"
        wrapperClassName={styles["cover-image-controller"]}
        label="Cover Image"
        errorMessage={errors.coverImageUrl?.message}
        rules={{
          required: {
            value: true,
            message: requiredErrorMessage("Audio File"),
          },
        }}
        defaultSrc={musicData?.coverImageUrl}
      />

      {/* ARTIST */}
      <SelectBox
        placeholder="Artist"
        label="Artist"
        items={artistsArr}
        wrapperClassName={styles["artist-controller"]}
        searchPlaceholder="Search artist..."
        defaultValue={musicData?.artist.name}
        control={control}
        errorMessage={errors.artist?.message}
        name="artist"
        rules={{
          required: {
            value: true,
            message: "Each music needs an artist",
          },
        }}
      />

      {/* OTHER ARTISTS */}
      <SelectBox
        items={artistsArr}
        selectMethod="multiple"
        label="Other Artists"
        placeholder="Other Artists"
        searchPlaceholder="Search artists..."
        wrapperClassName={styles["other-artists-controller"]}
        defaultValue={musicData?.otherArtists.map((artist) => artist.name)}
        errorMessage={errors.otherArtists?.message}
        control={control}
        name="otherArtists"
        rules={{
          required: false,
        }}
      />

      {/* RELEASE YEAR */}
      <FormControl
        id="add-music-release-year"
        label="Release Year"
        name="releaseYear"
        placeholder="Release Year"
        type="number"
        error={errors?.releaseYear?.message}
        controllerClassName={styles["release-year-controller"]}
        register={register}
        registerOptions={{
          required: {
            value: true,
            message: requiredErrorMessage("Release year"),
          },
          min: {
            value: 1900,
            message: "Release year must be equal or greater than 1900",
          },
          max: {
            value: currentYear,
            message: `Release year must be equal or less than ${currentYear}`,
          },
        }}
      />

      {/* GENRE */}
      <SelectBox
        items={genresArr}
        placeholder="Choose a Genre"
        label="Genre"
        searchPlaceholder="Search genre..."
        wrapperClassName={styles["genre-controller"]}
        defaultValue={musicData?.genre}
        errorMessage={errors.genre?.message}
        selectMethod="single"
        control={control}
        name="genre"
        rules={{
          required: {
            value: true,
            message: requiredErrorMessage("Genre"),
          },
        }}
      />

      {/* CATEGORIES */}
      <CategoriesController
        errorMessage={errors?.categories?.message}
        wrapperClassName={styles["categories-controller"]}
        defaultValue={musicData?.categories}
        control={control}
        rules={{
          required: {
            value: true,
            message: requiredErrorMessage("Categories"),
          },
        }}
      />
    </div>
  );
}

export default MusicFormFields;
