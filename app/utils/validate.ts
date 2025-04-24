import { ZodError, type ZodTypeAny } from "zod";

export async function validate<T>(
  validator: ZodTypeAny,
  payload: T | { [k: string]: string }
) {
  try {
    validator.parse(payload);
  } catch (err) {
    if (err instanceof ZodError) {
      let errorObj: { [k: string]: string } = {};
      const errorObjKey = err.errors[0].path[0];
      const errorObjMsg = err.errors[0].message;
      errorObj[errorObjKey] = errorObjMsg;
      return errorObj;
    }
  }
}
