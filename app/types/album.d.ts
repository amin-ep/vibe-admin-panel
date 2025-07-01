type AlbumArtist = {
  _id: string;
  name: string;
  id: string;
};

interface IAlbum {
  _id: string;
  name: string;
  releaseYear: number;
  artists: AlbumArtist[];
  musics: IMusic[];
  coverImageUrl: string;
  otherArtists: AlbumArtist[];
  categories: string[];
  createdAt: string;
  likeQuantity: number;
}

interface IAlbumPayload {
  name: string;
  releaseYear: number;
  artists: string[];
  musics: IMusic[] | string[];
  coverImageUrl: string;
  otherArtists: AlbumArtist[];
  categories: string[];
}
