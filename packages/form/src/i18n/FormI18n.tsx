import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";

import { FormFieldValidation, FormFieldValidationError } from "../field/types";

export type GetValidationErrorMessage = (
  field: { name: string; value?: string | number | boolean | Date | null },
  error: FormFieldValidationError,
  rules: Partial<FormFieldValidation<{}, unknown>>
) => string | undefined;

export interface FormI18nContextProps {
  getValidationErrorMessage: GetValidationErrorMessage;
}

export const FormI18nContext = createContext<FormI18nContextProps>({
  getValidationErrorMessage(field, error, rules) {
    return error.message != null && error.message !== ""
      ? error.message
      : undefined;
  },
});

export interface FormI18nProviderProps {
  children?: ReactNode;
  getValidationErrorMessage: GetValidationErrorMessage;
}

export const FormI18nProvider: FC<FormI18nProviderProps> = ({
  children,
  getValidationErrorMessage,
}) => {
  const context = useMemo<FormI18nContextProps>(
    () => ({
      getValidationErrorMessage: getValidationErrorMessage,
    }),
    [getValidationErrorMessage]
  );

  return (
    <FormI18nContext.Provider value={context}>
      {children}
    </FormI18nContext.Provider>
  );
};

export const useI18nValidationError = (
  name: string,
  rules: Partial<FormFieldValidation<{}, unknown>>
) => {
  const { getValidationErrorMessage } = useContext(FormI18nContext);

  return useMemo(() => {
    return (error: FormFieldValidationError, value: any): string | undefined =>
      getValidationErrorMessage(
        {
          name,
          value,
        },
        error,
        rules
      );
  }, [name, rules]);
};
