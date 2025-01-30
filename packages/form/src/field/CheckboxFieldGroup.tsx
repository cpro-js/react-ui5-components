import "../form/formSupport";

import { FC, ReactNode, createContext, forwardRef } from "react";

import { CheckboxFieldProps } from "./CheckboxField";

export interface CheckboxFieldGroupContextProps
  extends ForwardedCheckboxFieldProps {}

export const CheckboxFieldGroupContext = createContext<
  CheckboxFieldGroupContextProps | undefined
>(undefined);

export interface ForwardedCheckboxFieldProps
  extends Omit<CheckboxFieldProps, "boolean" | "value" | "text"> {
  children?: ReactNode;
}

export interface CheckboxFieldGroupProps extends ForwardedCheckboxFieldProps {}

export const CheckboxFieldGroup: FC<CheckboxFieldGroupProps> = forwardRef(
  ({ children, ...props }, _ref) => {
    return (
      <CheckboxFieldGroupContext.Provider value={props}>
        {children}
      </CheckboxFieldGroupContext.Provider>
    );
  }
);
