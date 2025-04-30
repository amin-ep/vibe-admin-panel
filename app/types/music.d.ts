interface IMusic {
  _id: string;
  name: string;
  coverImageUrl: string;
  audioFileUrl: string;

  artist: string;
  otherArtists: string[];

  releaseYear: number;

  categories: string[];
  genre: string;

  likes: {
    _id: Types.ObjectId;
    music: Types.ObjectId;
    user: Types.ObjectId;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

interface ICreateMusicResponse {
  status: string;
  data: {
    document: IMusic;
  };
}
