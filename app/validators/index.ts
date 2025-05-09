import z from "zod";
import { categoriesArr } from "~/utils/constants";

export const stringSchema = (fieldName: string, min: number, max: number) =>
  z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} should be a string value`,
    })
    .min(min, {
      message: `${fieldName} should be at least ${min} characters`,
    })
    .max(max, {
      message: `${fieldName} should be ${max} or less characters`,
    });

export const email = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email should be a string value",
  })
  .email({
    message: "Please provide a valid email address",
  });

export const releaseYear = z.coerce
  .number({
    required_error: "Music release year is required",
    invalid_type_error: "Release year should be a number value",
  })
  .min(1900)
  .max(new Date().getFullYear() as number);

export const categoriesEnum: string[] = categoriesArr.map((el) => el.title);
//@ts-ignore
export const categories = z.array(z.enum(categoriesEnum));
