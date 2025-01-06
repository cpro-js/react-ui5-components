import "../form/formSupport";

import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";
import { InputDomRef } from "@ui5/webcomponents-react";
import {
  FC,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useController, useFormContext } from "react-hook-form";

import {
  CurrencyInput,
  CurrencyInputProps,
} from "../component/number/CurrencyInput";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldElement, FormFieldValidation } from "./types";
import { hasError } from "./util";

export type CurrencyInputFieldProps = Omit<
  CurrencyInputProps,
  "name" | "value" | "onChange" | "valueState" | "onBlur"
> &
  Pick<FormFieldValidation, "required" | "min" | "max"> & {
    name: string;
  };

export const CurrencyInputField = forwardRef<
  FormFieldElement,
  CurrencyInputFieldProps
>(({ name, required, min, max, ...props }, forwardedRef) => {
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

  // store input ref for intenral usage
  const internalRef = useRef<InputDomRef>(null);
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
    <CurrencyInput
      {...props}
      ref={internalRef}
      name={field.name}
      value={value}
      onChange={(_, val) => {
        field.onChange(val);
      }}
      onBlur={field.onBlur}
      required={required}
      valueState={
        hasError(fieldState.error) ? ValueState.Negative : ValueState.None
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
});
