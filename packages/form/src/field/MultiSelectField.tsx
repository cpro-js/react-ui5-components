import "../form/formSupport";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller } from "react-hook-form";

import {
  MultiSelect,
  MultiSelectItem,
  MultiSelectProps,
} from "../component/MultiSelect";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";

export type MultiSelectFieldProps<T = MultiSelectItem> = Omit<
  MultiSelectProps<T>,
  "name" | "value" | "onSelectionChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export function MultiSelectField<T = MultiSelectItem>({
  name,
  required,
  ...props
}: MultiSelectFieldProps<T>) {
  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
    }),
    [required]
  );

  const getValidationErrorMessage = useI18nValidationError(name, rules);

  return (
    <Controller<any>
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        // get error message (Note: undefined fallbacks to default message of ui5 component)
        const errorMessage = hasError(fieldState.error)
          ? getValidationErrorMessage(fieldState.error, field.value)
          : undefined;

        return (
          <MultiSelect
            {...props}
            ref={field.ref}
            name={field.name}
            value={field.value}
            onSelectionChange={(_, value) => {
              field.onChange(value);
            }}
            valueState={
              hasError(fieldState.error) ? ValueState.Error : ValueState.None
            }
            valueStateMessage={
              errorMessage != null && (
                <div slot="valueStateMessage">{errorMessage}</div>
              )
            }
            onBlur={(event) => {
              // ignore blur event when combobox items are clicked
              if ((event.target as any).open && event.relatedTarget != null) {
                return;
              }
              field.onBlur();
            }}
            required={required}
          />
        );
      }}
    />
  );
}
