import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller } from "react-hook-form";

import { TextInput, TextInputProps } from "../component/TextInput";
import { hasError, useFormI18n } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";

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

  const { getValidationErrorMessage } = useFormI18n();

  return (
    <Controller<any>
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        // use empty string to reset value, undefined will be ignored by web component
        const value = field.value === undefined ? "" : field.value;
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
              hasError(fieldState.error) ? (
                <div slot="valueStateMessage">
                  {getValidationErrorMessage(
                    {
                      name: field.name,
                      value: field.value,
                    },
                    fieldState.error,
                    rules
                  )}
                </div>
              ) : undefined
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
