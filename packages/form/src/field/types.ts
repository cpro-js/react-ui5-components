import { FieldPath } from "react-hook-form";
import { UnpackNestedValue } from "react-hook-form/dist/types/form";

export type FormFieldValidationRule<
  T extends boolean | number | string | RegExp
> = T | { value: T; message: string };

export type FormFieldValidateResult = string | boolean | undefined;
export type FormFieldValidate<TFieldValue> = (
  value: TFieldValue
) => FormFieldValidateResult | Promise<FormFieldValidateResult>;

export interface FormFieldValidation {
  required?: FormFieldValidationRule<boolean>;
  min?: FormFieldValidationRule<number>;
  max?: FormFieldValidationRule<number>;
  minLength?: FormFieldValidationRule<number>;
  maxLength?: FormFieldValidationRule<number>;
  validate?: FormFieldValidate<any> | Record<string, FormFieldValidate<any>>;
}

export interface FormFieldValidationError {
  type: keyof FormFieldValidation | string; // string to allow user types
  message?: string;
}

export type FormActionErrors<FormValues> = { [P in keyof FormValues]?: string };

export interface FormActions<FormValues> {
  /**
   * Set error messages for specific fields.
   * @param errors
   * @param config
   */
  setErrors(
    errors: Array<{ name: FieldPath<FormValues>; message: string }>,
    config?: { shouldFocus?: boolean }
  ): void;

  /**
   * Reset form to it's initial state.
   */
  reset(): void;
}
