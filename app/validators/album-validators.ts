import { z } from "zod";
import { categories, releaseYear, stringSchema } from ".";

const name = stringSchema("Name", 1, 40);

const musics = z.array(
  z.string({
    required_error: "Each music title must be a string.",
    invalid_type_error: "Each music title must be a string.",
  }),
  {
    required_error: "Musics required",
    invalid_type_error: "Musics should be an array of strings",
  },
);

const artist = z
  .string({
    required_error: "Artist name is required.",
    invalid_type_error: "Artist name must be a string.",
  })
  .min(1, "Artist name can't be empty.");

const otherArtists = z.array(
  z.string({
    required_error: "Each artist name must be a string.",
    invalid_type_error: "Each artist name must be a string.",
  }),
);

const createAlbumValidator = z.object(
  {
    name,
    releaseYear: releaseYear,
    artist,
    musics,
    otherArtists: otherArtists.optional(),
    categories: categories,
  },
  {
    required_error: "Please fill this form!",
  },
);

export { createAlbumValidator };
