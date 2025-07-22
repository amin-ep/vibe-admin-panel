type MusicArtist = { _id: string; name: string };

interface IRelatedMusic {
  _id: string;
  name: string;
  audioFileUrl: string;
  coverImageUrl: string;
  otherArtists: MusicArtist[];
  artists: MusicArtist[];
  likes: string[];
  likesQuantity: number;
}

interface IMusic {
  _id: string;
  name: string;
  audioFileUrl: string;
  coverImageUrl: string;
  artists: MusicArtist[];
  otherArtists: MusicArtist[];
  releaseYear: number;

  categories: string[];
  genre: string;
  likeQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  relatedMusics: IRelatedMusic[];
}

interface ICreateMusicResponse {
  status: string;
  data: {
    document: IMusic;
  };
}

interface IMusicStats {
  musicsPerCategory: { _id: string; count: number }[];
  musicsPerGenre: { _id: string; count: number }[];
  musicsPerArtist: { count: number; artistId: string; name: string }[];
}

interface IGetMusicStatsResponse {
  status: string;
  data: IMusicStats;
}

interface IMusicPayload {
  name: string;
  audioFileUrl: string;
  coverImageUrl: string;
  artists: string[];
  otherArtists: string[] | MusicArtist[];
  releaseYear: number;
  categories: string[];
  genre: string;
  relatedMusics: string[];
}
