import Card from "./Card";
import styles from "./AlbumsList.module.css";

type Props = { albumData: IAlbum[] };

function AlbumsList({ albumData }: Props) {
  return (
    <div className={styles.container}>
      {albumData.map((album) => (
        <Card key={album._id} album={album} />
      ))}
    </div>
  );
}

export default AlbumsList;
