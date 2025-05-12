import clsx from "clsx";
import { useSelectBoxArray } from "~/hooks/useSelectBoxArray";
import { genresArr } from "~/utils/constants";
import CategoriesController from "../CategoriesController";
import FormControl from "../FormControl";
import ImageInput from "../ImageInput/ImageInput";
import SelectBox from "../SelectBox/SelectBox";
import MusicFieldsAudioInput from "./MusicFieldsAudioInput";
import styles from "./MusicFormFields.module.css";
type Props = {
  errors?: { [k: string]: string };
  artists: IArtist[];
  values?: FormValues;
  mode?: "create" | "update";
  musicData?: IMusic;
};

function MusicFormFields({
  errors,
  artists,
  values,
  mode = "create",
  musicData,
}: Props) {
  const artistsArr = useSelectBoxArray(artists as IArtist[]);

  return (
    <div className={styles["grid-container"]}>
      {/* NAME */}
      <FormControl
        name="name"
        id="add-music-name"
        label="Name"
        placeholder="Name"
        type="text"
        error={errors?.name}
        controllerClassName={styles["name-controller"]}
        defaultValue={musicData?.name}
        value={values?.name}
      />

      {/* AUDIO */}
      <MusicFieldsAudioInput
        errorMessage={errors?.audioFileUrl}
        className={styles["audio-controller"]}
        defaultAudioSrc={musicData?.audioFileUrl}
      />

      {/* COVER IMAGE */}
      <ImageInput
        errorMessage={errors?.coverImageUrl}
        name="coverImageUrl"
        rounded="md"
        wrapperClassName={clsx(styles["cover-image-controller"], "h-full")}
        defaultImage={musicData?.coverImageUrl}
      />

      {/* ARTIST */}
      <SelectBox
        inputName="artist"
        placeholder="Artist"
        label="Artist"
        items={artistsArr}
        wrapperClassName={styles["artist-controller"]}
        searchPlaceholder="Search artist..."
        errorMessage={errors?.artist}
        defaultValue={musicData?.artist.name}
      />

      {/* OTHER ARTISTS */}
      <SelectBox
        items={artistsArr}
        inputName="otherArtists"
        selectMethod="multiple"
        label="Other Artists"
        placeholder="Other Artists"
        searchPlaceholder="Search artists..."
        wrapperClassName={styles["other-artists-controller"]}
        defaultValue={musicData?.otherArtists.map((artist) => artist.name)}
      />

      {/* RELEASE YEAR */}
      <FormControl
        id="add-music-release-year"
        label="Release Year"
        name="releaseYear"
        placeholder="Release Year"
        type="number"
        error={errors?.releaseYear}
        controllerClassName={styles["release-year-controller"]}
        defaultValue={musicData?.releaseYear.toString()}
      />

      {/* GENRE */}
      <SelectBox
        items={genresArr}
        placeholder="Choose a Genre"
        label="Genre"
        searchPlaceholder="Search genre..."
        inputName="genre"
        wrapperClassName={styles["genre-controller"]}
        errorMessage={errors?.genre}
        defaultValue={musicData?.genre}
      />

      {/* CATEGORIES */}
      <CategoriesController
        errorMessage={errors?.categories}
        wrapperClassName={styles["categories-controller"]}
        defaultValue={musicData?.categories}
      />
    </div>
  );
}

export default MusicFormFields;
