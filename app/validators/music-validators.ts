import { z } from "zod";
import { stringSchema } from ".";
import { categoriesArr, genresArr } from "~/utils/constants";

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const name = stringSchema("name", 2, 35);
const releaseYear = z.number({
  required_error: "Music release year is required",
  invalid_type_error: "Release year should be a number value",
});
const coverImageUrl = z
  .any()
  .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type));
const categoriesEnum: string[] = categoriesArr.map((el) => el.title);
// const audioFileUrl = z
//   .instanceof(File)
//   .refine((file) => file.type.startsWith("audio/"), {
//     message: "Only audio files are allowed",
//   });

//@ts-ignore
const categories = z.array(z.enum(categoriesEnum));
const artist = z.string();
const otherArtists = z.array(z.string(), {
  invalid_type_error: "Other artists field should be an array of string",
});

const genreEnum = genresArr.map((el) => el.title);

//@ts-ignore
const genre = z.enum(genreEnum);

const validateCreateMusic = z.object({
  name,
  // audioFileUrl,
  // coverImageUrl,
  artist,
  otherArtists: otherArtists.optional(),
  releaseYear,
  categories,
  genre,
});

export { validateCreateMusic };
