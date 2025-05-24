export const getServerAuthToken = (request: Request) => {
  const cookies = Object.fromEntries(request.headers).cookie;
  const key = process.env.AUTH_TOKEN_KEY;
  const authToken = cookies
    .split(" ")
    .find((el) => el.split("=")[0] === key)
    ?.split("=")[1];
  return authToken?.slice(0, 171);
};

// export function appendMusics(
//   musicData: IMusic[],
//   payload: Payload,
//   formData: FormData,
// ) {
//   const musicArray = (payload.musics as string).split(",");
//   const musicsIdsArray = musicArray.map((msc: string) => {
//     const musicsId = musicData.find(
//       (dataMusic: IMusic) => dataMusic.name === msc,
//     )?._id;
//     return musicsId;
//   });
//   delete payload.musics;
//   (payload.musics as string[]) = musicsIdsArray as string[];

//   formData.delete("musics");
//   for (let i = 0; (payload.musics as string[]).length > i; i++) {
//     formData.append(`musics[${i}]`, (payload.musics as string[])[i]);
//   }
// }

export const textExpander = (text: string, breakIndex: number) => {
  return text.length > breakIndex ? `${text.slice(0, breakIndex)}...` : text;
};
