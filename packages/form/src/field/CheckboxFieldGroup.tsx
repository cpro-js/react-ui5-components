import { ReactNode, createContext } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

import { CheckboxFieldProps } from "./CheckboxField";

interface ForwardedCheckboxFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> extends Omit<
    CheckboxFieldProps<FormValues, FormFieldName>,
    "boolean" | "value" | "text"
  > {
  children?: ReactNode;
}

export interface CheckboxFieldGroupProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> extends ForwardedCheckboxFieldProps<FormValues, FormFieldName> {}

export const CheckboxFieldGroupContext = createContext<
  CheckboxFieldGroupProps<any, any> | undefined
>(undefined);

export const CheckboxFieldGroup = <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>({
  children,
  ...props
}: CheckboxFieldGroupProps<FormValues, FormFieldName>) => {
  return (
    <CheckboxFieldGroupContext.Provider value={props}>
      {children}
    </CheckboxFieldGroupContext.Provider>
  );
};
