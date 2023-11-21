import "../form/formSupport";

import { TextAreaDomRef, ValueState } from "@ui5/webcomponents-react";
import { FC, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { useController } from "react-hook-form";

import { TextArea, TextAreaProps } from "../component/TextArea";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldElement, FormFieldValidation } from "./types";
import { hasError } from "./util";

export type TextAreaFieldProps = Omit<
  TextAreaProps,
  "name" | "value" | "onChange" | "valueState" | "onBlur" | "maxlength"
> &
  Pick<FormFieldValidation, "required" | "minLength" | "maxLength"> & {
    name: string;
  };

export const TextAreaField = forwardRef<FormFieldElement, TextAreaFieldProps>(
  ({ name, required, minLength, maxLength, ...props }, forwardedRef) => {
    const rules: Partial<FormFieldValidation> = useMemo(
      () => ({
        required,
        minLength,
        maxLength,
      }),
      [required, minLength, maxLength]
    );

    const getValidationErrorMessage = useI18nValidationError(name, rules);

    const { field, fieldState } = useController({
      name: name,
      rules,
    });

    // store input ref for intenral usage
    const inputRef = useRef<TextAreaDomRef>(null);
    // forward outer ref to custom element
    useImperativeHandle(forwardedRef, () => ({
      focus() {
        if (inputRef.current != null) {
          inputRef.current.focus();
        }
      },
    }));
    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => inputRef.current);

    // use empty string to reset value, undefined will be ignored by web component
    const value = field.value === undefined ? "" : field.value;

    // get error message (Note: undefined fallbacks to default message of ui5 component)
    const errorMessage = hasError(fieldState.error)
      ? getValidationErrorMessage(fieldState.error, field.value)
      : undefined;

    return (
      <TextArea
        {...props}
        ref={inputRef}
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
  }
);
