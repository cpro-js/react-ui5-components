import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller } from "react-hook-form";

import { MultiSelect, MultiSelectProps } from "../component/MultiSelect";
import { hasError, useFormI18n } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";

export type MultiSelectFieldProps = Omit<
  MultiSelectProps,
  "name" | "value" | "onSelectionChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const MultiSelectField: FC<MultiSelectFieldProps> = ({
  name,
  required,
  ...props
}) => {
  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
    }),
    [required]
  );

  const { getValidationErrorMessage } = useFormI18n();

  return (
    <Controller<any>
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
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
              hasError(fieldState.error) ? (
                <div slot="valueStateMessage">
                  {getValidationErrorMessage(
                    {
                      name: field.name,
                      value: field.value,
                    },
                    fieldState.error,
                    rules
                  )}
                </div>
              ) : undefined
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
};
