export const getServerAuthToken = (request: Request) => {
  const cookies = Object.fromEntries(request.headers).cookie;
  const key = process.env.AUTH_TOKEN_KEY;
  const authToken = cookies
    .split(" ")
    .find((el) => el.split("=")[0] === key)
    ?.split("=")[1];
  return authToken;
};

export function appendCategories(
  formData: FormData,
  payloadCategories: string[],
) {
  formData.delete("categories");
  for (let i = 0; payloadCategories.length > i; i++) {
    formData.append(`categories[${i}]`, payloadCategories[i]);
  }
}

export function appendArtist(artists: IArtist[], formData: FormData) {
  const selectedArtistId = artists.find(
    (artist) => artist.name == Object.fromEntries(formData).artist,
  );
  formData.delete("artist");
  formData.append("artist", selectedArtistId?._id as string);
}

export function appendOtherArtists(formData: FormData, artists: IArtist[]) {
  const payload: Payload = Object.fromEntries(formData);
  if (payload.otherArtists) {
    let otherArtistsIdArr: string[] = [];
    artists.forEach((el) => {
      if ((payload.otherArtists as string[]).includes(el.name)) {
        otherArtistsIdArr = [...otherArtistsIdArr, el._id];
      }
    });
    formData.delete("otherArtists");
    otherArtistsIdArr.forEach((artistId, index) => {
      formData.append(`otherArtists[${index}]`, artistId);
    });
  }
}

export function appendMusics(
  musicData: IMusic[],
  payload: Payload,
  formData: FormData,
) {
  const musicArray = (payload.musics as string).split(",");
  const musicsIdsArray = musicArray.map((msc: string) => {
    const musicsId = musicData.find(
      (dataMusic: IMusic) => dataMusic.name === msc,
    )?._id;
    return musicsId;
  });
  delete payload.musics;
  (payload.musics as string[]) = musicsIdsArray as string[];

  formData.delete("musics");
  for (let i = 0; (payload.musics as string[]).length > i; i++) {
    formData.append(`musics[${i}]`, (payload.musics as string[])[i]);
  }
}

export const textExpander = (text: string, breakIndex: number) => {
  return text.length > breakIndex ? `${text.slice(0, breakIndex)}...` : text;
};
