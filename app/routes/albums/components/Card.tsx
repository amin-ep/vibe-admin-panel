type Props = { album: IAlbum };

function Card({ album }: Props) {
  return <div>{album.name}</div>;
}

export default Card;
