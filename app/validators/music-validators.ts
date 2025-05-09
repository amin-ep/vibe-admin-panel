import { z } from "zod";
import { genresArr } from "~/utils/constants";
import { categories, releaseYear, stringSchema } from ".";

const name = stringSchema("name", 2, 35);

const artist = z.string();
const otherArtists = z.array(z.string(), {
  invalid_type_error: "Other artists field should be an array of string",
});

const genreEnum = genresArr.map((el) => el.title);

//@ts-ignore
const genre = z.enum(genreEnum);

const validateCreateMusic = z.object({
  name,
  artist,
  otherArtists: otherArtists.optional(),
  releaseYear,
  categories,
  genre,
});

export { validateCreateMusic };
