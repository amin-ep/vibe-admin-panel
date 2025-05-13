import { useSelectBoxArray } from "~/hooks/useSelectBoxArray";
import styles from "./AlbumFormFields.module.css";
import FormControl from "../FormControl";
import ImageInput from "../ImageInput/ImageInput";
import SelectBox from "../SelectBox/SelectBox";
import CategoriesController from "../CategoriesController";

type Props = {
  artists: IArtist[];
  musics: IMusic[];
  errors?: RequestError;
  mode?: "create" | "update";
  albumData?: IAlbum;
};

function AlbumFormFields({
  artists,
  musics,
  errors,
  albumData,
  mode = "create",
}: Props) {
  const artistsArr = useSelectBoxArray(artists as IArtist[]);
  const musicsArr = useSelectBoxArray(musics as IMusic[]);
  return (
    <div className={styles["grid-container"]}>
      {/* NAME */}
      <FormControl
        id="add-album-name"
        label="Name"
        name="name"
        placeholder="Album name..."
        type="text"
        controllerClassName={styles["name-controller"]}
        error={errors?.name}
        defaultValue={albumData?.name}
      />

      {/* COVER IMAGE */}
      <ImageInput
        name="coverImageUrl"
        rounded="md"
        wrapperClassName={styles["cover-image-controller"]}
        errorMessage={errors?.coverImageUrl}
        defaultImage={albumData?.coverImageUrl}
      />

      {/* ARTIST */}
      <SelectBox
        inputName="artist"
        placeholder="Artist"
        label="Artist"
        items={artistsArr}
        searchPlaceholder="Search artists..."
        wrapperClassName={styles["artist-controller"]}
        errorMessage={errors?.artist}
        defaultValue={albumData?.artist.name}
      />

      {/* RELEASE YEAR */}
      <FormControl
        id="add-album-release-year"
        label="Release Year"
        name="releaseYear"
        placeholder="Release Year"
        type="number"
        error={errors?.releaseYear}
        controllerClassName={styles["release-year-controller"]}
        defaultValue={albumData?.releaseYear.toString()}
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
        errorMessage={errors?.otherArtists}
        defaultValue={albumData?.otherArtists.map((a) => a.name)}
      />

      {/* MUSICS */}
      <SelectBox
        inputName="musics"
        items={musicsArr}
        placeholder="Musics"
        searchPlaceholder="Search music..."
        label="Musics"
        selectMethod="multiple"
        wrapperClassName={styles["music-controller"]}
        errorMessage={errors?.musics}
        defaultValue={albumData?.musics.map((music) => music.name)}
      />

      {/* CATEGORIES */}
      <CategoriesController
        wrapperClassName={styles["categories-controller"]}
        errorMessage={errors?.categories}
        defaultValue={albumData?.categories}
      />
    </div>
  );
}

export default AlbumFormFields;
