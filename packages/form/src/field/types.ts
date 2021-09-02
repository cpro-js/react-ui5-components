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
