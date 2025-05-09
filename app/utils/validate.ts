import { ZodError, type ZodTypeAny } from "zod";

export async function validate<T>(
  validator: ZodTypeAny,
  payload: T | { [k: string]: string },
) {
  try {
    await validator.parse(payload);
  } catch (err) {
    if (err instanceof ZodError) {
      let errorObj: { [k: string]: string } = {};
      for (const error of err.errors) {
        const key = error.path[0]?.toString() ?? "unknown";
        errorObj[key] = error.message;
      }
      return errorObj;
    }
  }
}
