import { z } from "zod";
import { email, stringSchema } from ".";

const username = stringSchema("Username", 4, 30);
const password = stringSchema("Password", 6, 14);

const loginValidatorWithUsername = z.object({
  username,
  password,
});

const loginValidatorWithEmail = z.object({
  email,
  password,
});

export { loginValidatorWithUsername, loginValidatorWithEmail };
