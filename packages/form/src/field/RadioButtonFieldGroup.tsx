import { ReactNode, createContext } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

import { RadioButtonFieldProps } from "./RadioButtonField";

interface ForwardedRadioButtonFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> extends Omit<
    RadioButtonFieldProps<FormValues, FormFieldName>,
    "value" | "text"
  > {
  children?: ReactNode;
}

export interface RadioButtonFieldGroupProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> extends ForwardedRadioButtonFieldProps<FormValues, FormFieldName> {}

export const RadioButtonFieldGroupContext = createContext<
  RadioButtonFieldGroupProps<any, any> | undefined
>(undefined);

export const RadioButtonFieldGroup = <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>({
  children,
  ...props
}: RadioButtonFieldGroupProps<FormValues, FormFieldName>) => {
  return (
    <RadioButtonFieldGroupContext.Provider value={props}>
      {children}
    </RadioButtonFieldGroupContext.Provider>
  );
};
