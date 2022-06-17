import "../../form/formSupport";

import { ValueState } from "@ui5/webcomponents-react";
import { useImperativeHandle, useMemo, useRef } from "react";
import { useController } from "react-hook-form";

import {
  AutoComplete,
  AutoCompleteProps,
} from "../../component/autocomplete/AutoComplete";
import { useI18nValidationError } from "../../i18n/FormI18n";
import { FormFieldValidation } from "../types";
import { hasError } from "../util";

export type AutoCompleteFieldProps<T> = Omit<
  AutoCompleteProps<T>,
  "name" | "value" | "inputValue" | "onChange" | "onValueChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const AutoCompleteField = <T extends Object>({
  name,
  required,
  ...props
}: AutoCompleteFieldProps<T>) => {
  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
    }),
    [required]
  );

  const getValidationErrorMessage = useI18nValidationError(name, rules);

  const { field, fieldState } = useController({
    name: name,
    rules,
  });

  // store input ref for intenral usage
  const inputRef = useRef<HTMLInputElement>();
  // forward outer ref to custom element
  // useImperativeHandle(forwardedRef, () => ({
  //   focus() {
  //     if (inputRef.current != null) {
  //       inputRef.current.focus();
  //     }
  //   },
  // }));
  // forward field ref to stored internal input ref
  useImperativeHandle(field.ref, () => inputRef.current);

  // get error message (Note: undefined fallbacks to default message of ui5 component)
  const errorMessage = hasError(fieldState.error)
    ? getValidationErrorMessage(fieldState.error, field.value)
    : undefined;

  return (
    <AutoComplete<T>
      {...props}
      ref={field.ref}
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
      valueState={
        hasError(fieldState.error) ? ValueState.Error : ValueState.None
      }
      valueStateMessage={
        errorMessage != null && (
          <div slot="valueStateMessage">{errorMessage}</div>
        )
      }
      onBlur={field.onBlur}
      required={required}
    />
  );
};
