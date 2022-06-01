import "../form/formSupport";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useCallback, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";

import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";
import { NumberInput, NumberInputProps } from "..";

export type NumberInputFieldProps = Omit<
  NumberInputProps,
  "name" | "value" | "onChange" | "valueState" | "onBlur" | "max"
> &
  Pick<FormFieldValidation, "required" | "min" | "max"> & {
    name: string;
  };

export const NumberInputField: FC<NumberInputFieldProps> = ({
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

  const { field, fieldState } = useController({ name, rules });
  const { clearErrors } = useFormContext();

  // use empty string to reset value, undefined will be ignored by web component
  const value = field.value;

  // get error message (Note: undefined fallbacks to default message of ui5 component)
  const errorMessage = hasError(fieldState.error)
    ? getValidationErrorMessage(fieldState.error, field.value)
    : undefined;

  // clear error on first change
  const onKeyUp = useCallback(() => {
    clearErrors(name);
  }, [clearErrors, name]);

  return (
    <NumberInput
      {...props}
      ref={field.ref}
      name={field.name}
      value={value}
      onChange={(_, val) => {
        field.onChange(val);
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
        min != null ? (typeof min === "number" ? min : min.value) : undefined
      }
      aria-valuemax={
        max != null ? (typeof max === "number" ? max : max.value) : undefined
      }
      onKeyUp={hasError(fieldState.error) ? onKeyUp : undefined}
    />
  );
};
