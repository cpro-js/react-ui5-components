import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller } from "react-hook-form";

import { Select, SelectProps } from "../component/Select";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";

export type SelectFieldProps = Omit<
  SelectProps,
  "name" | "value" | "onChange" | "onSelectionChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const SelectField: FC<SelectFieldProps> = ({
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

  const getValidationErrorMessage = useI18nValidationError(name, rules);

  return (
    <Controller<any>
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <Select
            {...props}
            ref={field.ref}
            name={field.name}
            value={field.value}
            onChange={(_, value) => field.onChange(value)}
            valueState={
              hasError(fieldState.error) ? ValueState.Error : ValueState.None
            }
            valueStateMessage={
              hasError(fieldState.error) ? (
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
