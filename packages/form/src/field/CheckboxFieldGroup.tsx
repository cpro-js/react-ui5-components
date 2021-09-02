import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { FC, createContext } from "react";

import { CheckboxFieldProps } from "./CheckboxField";

export interface CheckboxFieldGroupContextProps
  extends ForwardedCheckboxFieldProps {}

export const CheckboxFieldGroupContext = createContext<
  CheckboxFieldGroupContextProps | undefined
>(undefined);

export interface ForwardedCheckboxFieldProps
  extends Omit<CheckboxFieldProps, "boolean" | "value" | "text"> {}

export interface CheckboxFieldGroupProps extends ForwardedCheckboxFieldProps {}

export const CheckboxFieldGroup: FC<CheckboxFieldGroupProps> = ({
  children,
  ...props
}) => {
  return (
    <CheckboxFieldGroupContext.Provider value={props}>
      {children}
    </CheckboxFieldGroupContext.Provider>
  );
};
