import z from "zod";

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
