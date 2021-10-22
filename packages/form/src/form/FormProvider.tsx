import * as React from "react";
import { ReactNode, useMemo } from "react";
import { FormProvider as ReactHookFormProvider } from "react-hook-form";

import { FormActions } from "../field/types";
import { FormActionContext } from "./context/FormActionContext";
import { UseFormControllerReturn } from "./useFormController";

export interface FormProviderProps<FormValues extends {}>
  extends UseFormControllerReturn<FormValues> {
  children?: ReactNode | undefined;
}

export function FormProvider<FormValues extends {}>(
  props: FormProviderProps<FormValues>
) {
  const { context, children, setErrors, setValues, reset, clear, submit } =
    props;

  const formActions: FormActions<FormValues> = useMemo(
    () => ({
      setErrors: setErrors,
      setValues: setValues,
      reset: reset,
      clear: clear,
      submit: submit,
    }),
    []
  );

  return (
    <ReactHookFormProvider {...context}>
      <FormActionContext.Provider value={formActions}>
        {children}
      </FormActionContext.Provider>
    </ReactHookFormProvider>
  );
}
