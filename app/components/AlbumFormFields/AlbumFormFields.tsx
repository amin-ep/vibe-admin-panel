import { useSelectBoxArray } from "~/hooks/useSelectBoxArray";
import CategoriesController from "../CategoriesController";
import FormControl from "../FormControl";
import SelectBox from "../SelectBox/SelectBox";
import styles from "./AlbumFormFields.module.css";
import type {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { requiredErrorMessage } from "~/utils/fieldErrorMessage";
import ImageDropzone from "../ImageDropzone/ImageDropzone";

export interface IAlbumFields extends IAlbumPayload, FieldValues {}

type Props = {
  artists: IArtist[];
  musics: IMusic[];
  register: UseFormRegister<IAlbumFields>;
  errors: FieldErrors<IAlbumFields>;
  control: Control<IAlbumFields>;
  albumData?: IAlbum;
};

function AlbumFormFields({
  artists,
  musics,
  errors,
  albumData,
  control,
  register,
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
        error={errors?.name?.message}
        register={register}
        registerOptions={{
          required: {
            value: true,
            message: requiredErrorMessage("Name"),
          },
        }}
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
            message: requiredErrorMessage("Cover Image"),
          },
        }}
        defaultSrc={albumData?.coverImageUrl}
      />

      {/* ARTIST */}
      <SelectBox<IAlbumFields>
        name="artists"
        rules={{
          required: {
            value: true,
            message: requiredErrorMessage("Artist"),
          },
        }}
        placeholder="Artist"
        label="Artist"
        items={artistsArr}
        searchPlaceholder="Search artists..."
        wrapperClassName={styles["artist-controller"]}
        errorMessage={errors?.artists?.message}
        defaultValue={albumData?.artists.map((artist) => artist.name)}
        control={control}
        selectMethod="multiple"
      />

      {/* RELEASE YEAR */}
      <FormControl<IAlbumFields>
        id="add-album-release-year"
        label="Release Year"
        name="releaseYear"
        placeholder="Release Year"
        type="number"
        error={errors?.releaseYear?.message}
        register={register}
        registerOptions={{
          required: {
            value: true,
            message: requiredErrorMessage("Release year"),
          },
        }}
        controllerClassName={styles["release-year-controller"]}
      />

      {/* OTHER ARTISTS */}
      <SelectBox<IAlbumFields>
        items={artistsArr}
        name="otherArtists"
        selectMethod="multiple"
        label="Other Artists"
        placeholder="Other Artists"
        searchPlaceholder="Search artists..."
        wrapperClassName={styles["other-artists-controller"]}
        errorMessage={errors?.otherArtists?.message}
        defaultValue={albumData?.otherArtists.map((a) => a.name)}
        control={control}
        rules={{
          required: false,
        }}
      />

      {/* MUSICS */}
      <SelectBox<IAlbumFields>
        name="musics"
        items={musicsArr}
        placeholder="Musics"
        searchPlaceholder="Search music..."
        label="Musics"
        selectMethod="multiple"
        wrapperClassName={styles["music-controller"]}
        errorMessage={errors?.musics?.message}
        defaultValue={albumData?.musics.map((music) => music.name)}
        control={control}
        rules={{
          required: {
            value: true,
            message: requiredErrorMessage("Musics"),
          },
        }}
      />

      {/* CATEGORIES */}
      <CategoriesController<IAlbumFields>
        wrapperClassName={styles["categories-controller"]}
        errorMessage={errors?.categories?.message}
        defaultValue={albumData?.categories}
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

export default AlbumFormFields;
