import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller } from "react-hook-form";

import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";
import { CurrencyInput, CurrencyInputProps } from "..";

export type CurrencyInputFieldProps = Omit<
  CurrencyInputProps,
  "name" | "value" | "onChange" | "valueState" | "onBlur" | "max"
> &
  Pick<FormFieldValidation, "required" | "min" | "max"> & {
    name: string;
  };

export const CurrencyInputField: FC<CurrencyInputFieldProps> = ({
  name,
  required,
  min,
  max,
  ...props
}) => {
  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
      min,
      max,
    }),
    [required, min, max]
  );

  const getValidationErrorMessage = useI18nValidationError(name, rules);

  return (
    <Controller<any>
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        // use empty string to reset value, undefined will be ignored by web component
        const value = field.value;

        // get error message (Note: undefined fallbacks to default message of ui5 component)
        const errorMessage = hasError(fieldState.error)
          ? getValidationErrorMessage(fieldState.error, field.value)
          : undefined;

        return (
          <CurrencyInput
            {...props}
            ref={field.ref}
            name={field.name}
            value={value}
            onChange={(event) => {
              const transformedValue =
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value);
              field.onChange(transformedValue);
            }}
            onBlur={field.onBlur}
            required={required}
            valueState={
              hasError(fieldState.error) ? ValueState.Error : ValueState.None
            }
            valueStateMessage={
              errorMessage != null && (
                <div slot="valueStateMessage">{errorMessage}</div>
              )
            }
            aria-valuemin={
              min != null
                ? typeof min === "number"
                  ? min
                  : min.value
                : undefined
            }
            aria-valuemax={
              max != null
                ? typeof max === "number"
                  ? max
                  : max.value
                : undefined
            }
          />
        );
      }}
    />
  );
};
