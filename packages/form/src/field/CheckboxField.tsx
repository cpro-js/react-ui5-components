import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";
import { CheckBoxDomRef } from "@ui5/webcomponents-react";
import {
  ChangeEvent,
  FC,
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useController, useFormContext } from "react-hook-form";

import { CheckBoxProps, Checkbox } from "../component/Checkbox";
import { CheckboxFieldGroupContext } from "./CheckboxFieldGroup";
import { FormFieldElement, FormFieldValidation } from "./types";
import { hasError } from "./util";

export const MISSING_NAME = "CHECKBOX_NAME_IS_MISSING";

export type CheckboxFieldProps = Omit<
  CheckBoxProps,
  | "name"
  | "checked"
  | "defaultChecked"
  | "defaultValue"
  | "onChange"
  | "valueState"
  | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    /**
     * Name is optional within CheckboxFieldGroup
     */
    name?: string;
    /**
     * Optional parameter. If set to true, checkbox will using boolean instead of value.
     */
    boolean?: boolean;
  };

/** `CheckboxField` as wrapper of `Checkbox` to be used in a form*/
export const CheckboxField = forwardRef<FormFieldElement, CheckboxFieldProps>(
  ({ name, value = "on", boolean, required, ...props }, forwardedRef) => {
    const { setValue, getValues } = useFormContext<any>(); // retrieve all hook methods
    const checkboxGroupProps = useContext(CheckboxFieldGroupContext);
    const isMultiValue = checkboxGroupProps != null;
    const checkboxName =
      name != null
        ? name
        : checkboxGroupProps?.name != null
        ? checkboxGroupProps.name
        : MISSING_NAME;
    const checkboxRequired =
      required != null ? required : checkboxGroupProps?.required;

    const rules: Partial<FormFieldValidation> = useMemo(
      () => ({
        required: checkboxRequired,
      }),
      [checkboxRequired]
    );

    const { field, fieldState } = useController({
      name: checkboxName,
      rules,
    });

    // store input ref for intenral usage
    const internalRef = useRef<CheckBoxDomRef>(null);
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

    const checked = isMultiValue
      ? !Array.isArray(field.value)
        ? false
        : (field.value as Array<string>).indexOf(value) !== -1
      : boolean
      ? field.value
      : field.value === value;

    return (
      <Checkbox
        {...checkboxGroupProps}
        {...props}
        ref={internalRef}
        name={field.name}
        value={value}
        checked={checked}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          let updatedValue: any = event.target.checked
            ? event.target.value
            : undefined;
          if (isMultiValue) {
            const actualValues = getValues(field.name);
            updatedValue = (Array.isArray(actualValues) ? actualValues : [])
              .filter((v) => event.target.value !== v)
              .concat(event.target.checked ? [event.target.value] : []);
          } else if (boolean) {
            updatedValue = event.target.checked;
          }
          // call field onChange listener to update values and trigger validations if necessary
          field.onChange(updatedValue);
          //  ensure that the value is is internally set correctly (onChange does something weird while persisting values)
          setValue(field.name, updatedValue);
        }}
        valueState={
          hasError(fieldState.error) ? ValueState.Negative : ValueState.None
        }
        onBlur={field.onBlur}
      />
    );
  }
);
