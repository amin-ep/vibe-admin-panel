import { z } from "zod";
import { genresArr } from "~/utils/constants";
import { categories, releaseYear, stringSchema } from ".";

const name = stringSchema("name", 2, 35);

const artist = z.string().nonempty({
  message: "Please chose an artist",
});
const otherArtists = z.array(z.string(), {
  invalid_type_error: "Other artists field should be an array of string",
});

const genreEnum = genresArr.map((el) => el.title);

const relatedMusics = z.array(z.string(), {
  message: "Add some related musics",
});

//@ts-ignore
const genre = z.enum(genreEnum);

const validateCreateMusic = z.object({
  name,
  artist,
  otherArtists: otherArtists.optional(),
  releaseYear,
  categories,
  genre,
  relatedMusics,
});

const validateEditMusic = z.object({
  name: name.optional(),
  artist: artist.optional(),
  otherArtists: otherArtists.optional(),
  releaseYear: releaseYear.optional(),
  categories: categories.optional(),
  genre: genre.optional(),
  relatedMusics: relatedMusics.optional(),
});

export { validateCreateMusic, validateEditMusic };
