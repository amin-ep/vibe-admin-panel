import { z } from "zod";
import { stringSchema } from ".";

const name = stringSchema("Name", 4, 30);

export const createArtistValidator = z.object({
  name,
});
