import { forwardRef, useImperativeHandle, useRef } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

import { useControlledField } from "../form/_internal/useField";
import { FormFieldCommonProps, FormFieldRef } from "./types";

export type HiddenFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = FormFieldCommonProps<FormValues, FormFieldName>;

export const HiddenField = forwardRef<
  FormFieldRef<any, any>,
  HiddenFieldProps<any, any>
>(({ name }, forwardedRef) => {
  const field = useControlledField({
    name,
  });
  // support imperative form field api via ref
  useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

  // store input ref for internal usage
  const elementRef = useRef<HTMLInputElement>(null);

  // forward field ref to stored internal input ref
  useImperativeHandle(field.ref, () => elementRef.current);

  return (
    <input
      {...field}
      ref={elementRef}
      type="hidden"
      // use empty string to reset value, undefined will be ignored by web component
      value={field.value === undefined ? "" : field.value}
    />
  );
});
