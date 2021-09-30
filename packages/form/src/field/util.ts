import { FormFieldValidationError } from "./types";

export const hasError = (
  error?: FormFieldValidationError
): error is FormFieldValidationError => error != null;
