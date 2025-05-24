export function requiredErrorMessage(fieldName: string) {
  return `${fieldName} is required`;
}

export function minLengthErrorMessage(fieldName: string, min: number) {
  return `${fieldName} must be at least ${min} characters`;
}

export function maxLengthErrorMessage(fieldName: string, max: number) {
  return `${fieldName} must be equal or less than ${max} characters`;
}

export function invalidErrorMessage(fieldName: string) {
  return `Please input a valid ${fieldName}`;
}
