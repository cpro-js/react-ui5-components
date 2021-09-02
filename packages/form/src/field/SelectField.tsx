import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { FC, useMemo } from "react";
import { Controller } from "react-hook-form";

import { Select, SelectProps } from "../component/Select";
import { FormFieldValidation } from "./types";

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
              fieldState.error != null ? ValueState.Error : ValueState.None
            }
            valueStateMessage={
              fieldState.error != null ? (
                <div slot="valueStateMessage">{fieldState.error.type}</div>
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
