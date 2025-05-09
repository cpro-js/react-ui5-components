import { Ui5CustomEvent } from "@ui5/webcomponents-react";
import {
  DeepPartial,
  FieldError,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";

import { TypedCustomEvent } from "../hook/useCustomEventDispatcher";

export type PartialFormValues<FormValues extends {}> = DeepPartial<FormValues>;

export type InitialFormValues<FormValues extends {}> =
  | PartialFormValues<FormValues>
  | (() => Promise<PartialFormValues<FormValues>>);

export type FormSubmitHandler<FormValues extends {}> = (
  values: FormValues,
  actions: FormActions<FormValues>
) => void | Promise<void>;

export type ChangedField<FormValues extends {}> = {
  name: FieldPath<FormValues>;
};

export type FormChangeHandler<FormValues extends {}> = (
  values: PartialFormValues<FormValues>,
  actions: FormActions<FormValues>,
  changedField: ChangedField<FormValues>
) => void;

export interface FormFieldActions<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> {
  /**
   * Validates this field only
   */
  validate(): Promise<boolean>;

  /**
   * Clears errors of this field
   */
  clearError(): void;

  /**
   * Sets validation error for this field
   * @param error
   */
  setError(error: FieldError): void;

  /**
   * Updates a new value for this field.
   * Note: This doesn't trigger validation again, but marks that field as touched/dirty
   * @param value
   */
  setValue(value: FieldPathValue<FormValues, FormFieldName>): void;

  /**
   * Gets the current value of this field
   */
  getValue(): FieldPathValue<FormValues, FormFieldName> | undefined;

  /**
   * Allows to focus this field
   */
  focus(): void;
}

/**
 * Base element that will be returned by ref
 */
export interface FormFieldRef<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> extends FormFieldActions<FormValues, FormFieldName> {}

export type FieldEventDetail<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = {
  name: FormFieldName;
  value: FieldPathValue<FormValues, FormFieldName>;
  valid: boolean;
  field: FormFieldActions<FormValues, FormFieldName>;
  form: FormActions<FormValues>;
};

export type FormFieldChangeEvent<
  EventTarget,
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = TypedCustomEvent<EventTarget, FieldEventDetail<FormValues, FormFieldName>>;

export type FormFieldSubmitEvent<
  EventTarget,
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = TypedCustomEvent<EventTarget, FieldEventDetail<FormValues, FormFieldName>>;

export interface FormFieldCommonProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> {
  name: FormFieldName;
  dependsOn?:
    | string
    | string[]
    | FieldPath<FormValues>
    | FieldPath<FormValues>[];
}

export type FormFieldValidationRule<
  T extends boolean | number | string | RegExp
> = T | { value: T; message: string };

export type FormFieldValidateResult = string | boolean | undefined;
export type FormFieldValidate<FormValues extends {}, TFieldValue> = (
  value: TFieldValue,
  values: PartialFormValues<FormValues>
) => FormFieldValidateResult | Promise<FormFieldValidateResult>;

export interface FormFieldValidation<FormValues extends {}, TFieldValue> {
  required?: FormFieldValidationRule<boolean>;
  min?: FormFieldValidationRule<number>;
  max?: FormFieldValidationRule<number>;
  minLength?: FormFieldValidationRule<number>;
  maxLength?: FormFieldValidationRule<number>;
  validate?:
    | FormFieldValidate<FormValues, TFieldValue>
    | Record<string, FormFieldValidate<FormValues, TFieldValue>>;
}

export interface FormFieldValidationError {
  type: keyof FormFieldValidation<any, any> | string; // string to allow user types
  message?: string;
}

export type FormActionErrors<FormValues> = { [P in keyof FormValues]?: string };

/**
 * Allows to focus a specific form field
 * @param name field to focus
 */
export type FormActionFocus<FormValues extends {}> = (
  name: FieldPath<FormValues>
) => void;

/**
 * Set error messages for specific fields.
 * @param errors
 * @param config
 */
export type FormActionSetErrors<FormValues extends {}> = (
  errors: Array<{ name: FieldPath<FormValues>; message: string }>,
  config?: { shouldFocus?: boolean }
) => void;

/**
 * Set new form values for fields.
 * Note: This does not override the default values of your form for the reset() method. You need to create a new form to reset the original default values.
 *
 * @param values
 */
export type FormActionSetValues<FormValues extends {}> = (
  values: Array<{ name: FieldPath<FormValues>; value: any }>,
  options?: Partial<{
    shouldValidate: boolean;
    shouldDirty: boolean;
    shouldTouch: boolean;
  }>
) => void;

export type FormActionGetValues<FormValues extends {}> = () =>
  | PartialFormValues<FormValues>
  | FormValues;

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

export interface FormActions<FormValues extends {}> {
  /**
   * Allows to focus a specific form field
   * @param name field to focus
   */
  focus: FormActionFocus<FormValues>;

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
   * Returns the
   */
  getValues: FormActionGetValues<FormValues>;

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
