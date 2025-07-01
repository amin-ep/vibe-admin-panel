export function appendOtherArtists<
  T extends { otherArtists: string[] | MusicArtist[] },
>(artists: IArtist[], data: T) {
  let otherArtistsIdArr: string[] = [];
  artists.forEach((el) => {
    if ((data.otherArtists as string[]).includes(el.name)) {
      otherArtistsIdArr = [...otherArtistsIdArr, el._id];
    }
  });
  data.otherArtists = otherArtistsIdArr;
}
