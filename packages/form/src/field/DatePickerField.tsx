import { DatePickerDomRef } from "@ui5/webcomponents-react";
import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { FieldError, useController } from "react-hook-form";

import { DatePicker, DatePickerProps } from "../component/DatePicker";
import { FormAdapterContext } from "../form/FormAdapter";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldElement, FormFieldValidation } from "./types";
import { hasError } from "./util";

const convertToDateOnly = (
  value: Date | any,
  parse: (value: any) => Date | null
): Date | null => {
  const temp = value instanceof Date ? value : parse(value);
  if (temp != null) {
    return new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
  }

  return null;
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

export const DatePickerField = forwardRef<
  FormFieldElement,
  DatePickerFieldProps
>(({ name, required, minDate, maxDate, ...props }, forwardedRef) => {
  const {
    date: { parse },
  } = useContext(FormAdapterContext);

  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
      validate: {
        ...(minDate == null
          ? {}
          : {
              minDate: (value?: Date | null) => {
                if (value == null) {
                  return true;
                }
                const normalizedValue = convertToDateOnly(value, parse);
                const normalizedMinDate = convertToDateOnly(minDate, parse);

                return (
                  normalizedValue == null ||
                  normalizedMinDate == null ||
                  normalizedValue >= normalizedMinDate
                );
              },
            }),
        ...(maxDate == null
          ? {}
          : {
              maxDate: (value?: Date | null) => {
                if (value == null) {
                  return true;
                }
                const normalizedValue = convertToDateOnly(value, parse);
                const normalizedMaxDate = convertToDateOnly(maxDate, parse);

                return (
                  normalizedValue == null ||
                  normalizedMaxDate == null ||
                  normalizedValue <= normalizedMaxDate
                );
              },
            }),
      },
    }),
    [parse, required, minDate, maxDate]
  );

  const getValidationErrorMessage = useI18nValidationError(name, rules);
  const { field, fieldState } = useController({ name, rules });

  // store input ref for intenral usage
  const internalRef = useRef<DatePickerDomRef>(null);
  // forward outer ref to custom element
  useImperativeHandle(forwardedRef, () => ({
    focus() {
      if (internalRef.current != null) {
        internalRef.current.focus();
      }
    },
  }));
  // forward field ref to stored internal input ref
  useImperativeHandle(field.ref, () => internalRef.current);

  // use null to reset value, undefined will be ignored by web component
  const value = field.value === undefined ? null : field.value;

  // get error message (Note: undefined fallbacks to default message of ui5 component)
  const errorMessage =
    hasError(fieldState.error) && !isErrorIgnored(fieldState.error)
      ? getValidationErrorMessage(fieldState.error, field.value)
      : undefined;

  return (
    <DatePicker
      {...props}
      ref={internalRef}
      name={field.name}
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      onChange={(event, value) =>
        field.onChange(value != null ? value : undefined)
      }
      valueState={hasError(fieldState.error) ? "Negative" : "None"}
      valueStateMessage={
        errorMessage != null && (
          <div slot="valueStateMessage">{errorMessage}</div>
        )
      }
      onBlur={field.onBlur}
      required={required}
    />
  );
});
