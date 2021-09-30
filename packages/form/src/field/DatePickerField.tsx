import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller, FieldError } from "react-hook-form";

import { DatePicker, DatePickerProps } from "../component/DatePicker";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";

const convertToDateOnly = (value: Date | number): Date => {
  const temp = typeof value === "number" ? new Date(value) : value;
  return new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
};

const isErrorIgnored = (error: FieldError | undefined) =>
  // minDate and maxDate errors are already handled by web component -> no need to provide our own error message
  error != null && (error.type === "minDate" || error.type === "maxDate");

export type DatePickerFieldProps = Omit<
  DatePickerProps,
  "name" | "value" | "onChange" | "valueState" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const DatePickerField: FC<DatePickerFieldProps> = ({
  name,
  required,
  minDate,
  maxDate,
  ...props
}) => {
  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
      validate: {
        ...(minDate == null
          ? {}
          : {
              minDate: (value?: Date | null) =>
                value == null ||
                convertToDateOnly(value) >= convertToDateOnly(minDate),
            }),
        ...(maxDate == null
          ? {}
          : {
              maxDate: (value?: Date | null) =>
                value == null ||
                convertToDateOnly(value) <= convertToDateOnly(maxDate),
            }),
      },
    }),
    [required, minDate, maxDate]
  );

  const getValidationErrorMessage = useI18nValidationError(name, rules);

  return (
    <Controller<any>
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        // use null to reset value, undefined will be ignored by web component
        const value = field.value === undefined ? null : field.value;
        return (
          <DatePicker
            {...props}
            ref={field.ref}
            name={field.name}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(event, value) =>
              field.onChange(value != null ? value : undefined)
            }
            valueState={
              hasError(fieldState.error) ? ValueState.Error : ValueState.None
            }
            valueStateMessage={
              hasError(fieldState.error) &&
              !isErrorIgnored(fieldState.error) ? (
                <div slot="valueStateMessage">
                  {getValidationErrorMessage(fieldState.error, field.value)}
                </div>
              ) : undefined
            }
            onBlur={field.onBlur}
            required={required}
          />
        );
      }}
    />
  );
};
