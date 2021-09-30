import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { ChangeEvent, FC, useContext, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Checkbox, CheckboxProps } from "../component/Checkbox";
import { CheckboxFieldGroupContext } from "./CheckboxFieldGroup";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";

export const MISSING_NAME = "CHECKBOX_NAME_IS_MISSING";

export type CheckboxFieldProps = Omit<
  CheckboxProps,
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
    boolean?: boolean;
  };

export const CheckboxField: FC<CheckboxFieldProps> = ({
  name,
  value = "on",
  boolean,
  required,
  ...props
}) => {
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

  return (
    <Controller<any>
      name={checkboxName}
      rules={rules}
      render={({ field, fieldState }) => {
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
            ref={field.ref}
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
              hasError(fieldState.error) ? ValueState.Error : ValueState.None
            }
            onBlur={field.onBlur}
          />
        );
      }}
    />
  );
};
