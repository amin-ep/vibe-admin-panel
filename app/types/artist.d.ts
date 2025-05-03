interface IArtist {
  _id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateArtistPayload = {
  name: string;
};
