type MusicArtist = { _id: string; name: string };

interface IMusic {
  _id: string;
  name: string;
  audioFileUrl: string;
  coverImageUrl: string;
  artist: MusicArtist;
  otherArtists: MusicArtist[];
  releaseYear: number;

  categories: string[];
  genre: string;
  likeQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateMusicResponse {
  status: string;
  data: {
    document: IMusic;
  };
}

type CreateMusicState = {
  status: string;
  errors?: { [k: string]: string };
  message?: string;
} | null;
