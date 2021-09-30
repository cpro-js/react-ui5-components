import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

import { FormFieldValidation, FormFieldValidationError } from "../field/types";

export interface FormI18nContextProps {
  getValidationErrorMessage: (
    field: { name: string; value?: string | number | boolean | Date | null },
    error: FormFieldValidationError,
    rules: Partial<FormFieldValidation>
  ) => string;
}

export const FormI18nContext = createContext<FormI18nContextProps>({
  getValidationErrorMessage(field, error, rules) {
    console.log("error", error);
    return error.message != null && error.message !== ""
      ? error.message
      : error.type;
  },
});

export interface FormI18nProviderProps {
  getValidationErrorMessage(
    fieldName: string,
    fieldValue: string | number | boolean | Date | null | undefined,
    validationRule: string,
    rules: Partial<FormFieldValidation>
  ): string;
}

export const FormI18nProvider: FC<FormI18nProviderProps> = ({
  children,
  getValidationErrorMessage,
}) => {
  const getMessage = useCallback(
    (field, error, rules) => {
      // always prefer user provided message
      if (error.message != null && error.message !== "") {
        return error.message;
      }

      // otherwise get validation message from external service
      return getValidationErrorMessage(
        field.name,
        field.value,
        error.type,
        rules
      );
    },
    [getValidationErrorMessage]
  );

  const context = useMemo<FormI18nContextProps>(
    () => ({
      getValidationErrorMessage: getMessage,
    }),
    [getMessage]
  );

  return (
    <FormI18nContext.Provider value={context}>
      {children}
    </FormI18nContext.Provider>
  );
};

export const hasError = (
  error?: FormFieldValidationError
): error is FormFieldValidationError => error != null;

export const useFormI18n = () => useContext(FormI18nContext);
