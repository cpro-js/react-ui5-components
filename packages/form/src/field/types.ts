import { EventType, FieldPath } from "react-hook-form";
import { UnpackNestedValue } from "react-hook-form/dist/types/form";

export type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends { [key in keyof T]: T[key] }
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

export type PartialFormValues<FormValues extends {}> = UnpackNestedValue<
  DeepPartial<FormValues>
>;

export type FormSubmitHandler<FormValues extends {}> = (
  values: FormValues,
  actions: FormActions<FormValues>
) => void | Promise<void>;

export type ChangedField<FormValues> = {
  name: FieldPath<FormValues>;
};

export type FormChangeHandler<FormValues extends {}> = (
  values: PartialFormValues<FormValues>,
  actions: FormActions<FormValues>,
  changedField: ChangedField<FormValues>
) => void;

/**
 * Base element that will be returned by ref
 */
export interface FormFieldElement {
  /**
   * Focus field
   */
  focus(): void;
}

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

/**
 * Set error messages for specific fields.
 * @param errors
 * @param config
 */
export type FormActionSetErrors<FormValues> = (
  errors: Array<{ name: FieldPath<FormValues>; message: string }>,
  config?: { shouldFocus?: boolean }
) => void;

/**
 * Set new form values for fields.
 * Note: This does not override the default values of your form for the reset() method. You need to create a new form to reset the original default values.
 *
 * @param values
 */
export type FormActionSetValues<FormValues> = (
  values: Array<{ name: FieldPath<FormValues>; value: any }>,
  options?: Partial<{
    shouldValidate: boolean;
    shouldDirty: boolean;
    shouldTouch: boolean;
  }>
) => void;

/**
 * Reset form to it's initial state.
 */
export type FormActionResetForm<FormValues> = () => void;

/**
 * Clear all form fields.
 */
export type FormActionClearForm<FormValues> = () => void;

/**
 * Submit form
 */
export type FormActionSubmitForm<FormValues> = () => void;

export interface FormActions<FormValues> {
  /**
   * Set error messages for specific fields.
   * @param errors
   * @param config
   */
  setErrors: FormActionSetErrors<FormValues>;

  /**
   * Set new form values for fields.
   * Note: This does not override the default values of your form for the reset() method. You need to create a new form to reset the original default values.
   *
   * @param values
   */
  setValues: FormActionSetValues<FormValues>;

  /**
   * Reset form to it's initial state.
   */
  reset: FormActionResetForm<FormValues>;

  /**
   * Clear all form fields.
   */
  clear: FormActionClearForm<FormValues>;

  /**
   * Submit form
   */
  submit: FormActionSubmitForm<FormValues>;
}
