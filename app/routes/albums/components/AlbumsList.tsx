import Card from "./Card";

type Props = { albumData: IAlbum[] };

function AlbumsList({ albumData }: Props) {
  return (
    <div>
      {albumData.map((album) => (
        <Card key={album._id} album={album} />
      ))}
    </div>
  );
}

export default AlbumsList;
