import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { ValueState } from "@ui5/webcomponents-react";
import { useMemo } from "react";
import { Controller } from "react-hook-form";

import {
  AsyncAutocomplete,
  AsyncAutocompleteProps,
} from "../component/auto-complete/AsyncAutocomplete";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldValidation } from "./types";
import { hasError } from "./util";

export type AsyncAutocompleteFieldProps<T> = Omit<
  AsyncAutocompleteProps<T>,
  "name" | "value" | "inputValue" | "onChange" | "onValueChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const AsyncAutocompleteField = <T extends Object>({
  name,
  required,
  ...props
}: AsyncAutocompleteFieldProps<T>) => {
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
          <AsyncAutocomplete<T>
            {...props}
            ref={field.ref}
            name={field.name}
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
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
      }}
    />
  );
};
