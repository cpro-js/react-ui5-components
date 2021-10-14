import { FieldPath } from "react-hook-form";

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
   * Set new form values for fields.
   * Note: This does not override the default values of your form for the reset() method. You need to create a new form to reset the original default values.
   *
   * @param values
   */
  setValues(values: Array<{ name: FieldPath<FormValues>; value: any }>): void;

  /**
   * Reset form to it's initial state.
   */
  reset(): void;

  /**
   * Clear all form fields.
   */
  clear(): void;

  /**
   * Submit form
   */
  submit(): void;
}
