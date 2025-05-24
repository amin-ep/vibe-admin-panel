private type AlbumArtist = {
    _id: string;
    name:string;
    id:string;
}

interface IAlbum {
    _id:string;
    name:string;
    releaseYear: number;
    artist: AlbumArtist
    musics: IMusic[];
    coverImageUrl: string;
    otherArtists: AlbumArtist[];
    categories: string[];
    createdAt:string;
  likeQuantity: number;
}

interface IAlbumPayload {
  name: string;
  releaseYear: number;
  artist: string;
  musics: IMusic[] | string[];
  coverImageUrl: string;
  otherArtists: AlbumArtist[];
  categories: string[];
}