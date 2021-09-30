import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller } from "react-hook-form";

import { TextInput, TextInputProps } from "../component/TextInput";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";

export type TextInputFieldProps = Omit<
  TextInputProps,
  "name" | "value" | "onChange" | "valueState" | "onBlur" | "maxlength"
> &
  Pick<FormFieldValidation, "required" | "minLength" | "maxLength"> & {
    name: string;
  };

export const TextInputField: FC<TextInputFieldProps> = ({
  name,
  required,
  minLength,
  maxLength,
  ...props
}) => {
  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
      minLength,
      maxLength,
    }),
    [required, minLength, maxLength]
  );

  const getValidationErrorMessage = useI18nValidationError(name, rules);

  return (
    <Controller<any>
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        // use empty string to reset value, undefined will be ignored by web component
        const value = field.value === undefined ? "" : field.value;

        const errorMessage = hasError(fieldState.error)
          ? getValidationErrorMessage(fieldState.error, field.value)
          : undefined;

        return (
          <TextInput
            {...props}
            ref={field.ref}
            name={field.name}
            value={value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            valueState={
              hasError(fieldState.error) ? ValueState.Error : ValueState.None
            }
            valueStateMessage={
              errorMessage != null && (
                <div slot="valueStateMessage">{errorMessage}</div>
              )
            }
            required={required}
            maxlength={
              maxLength != null
                ? typeof maxLength === "number"
                  ? maxLength
                  : maxLength.value
                : undefined
            }
          />
        );
      }}
    />
  );
};
