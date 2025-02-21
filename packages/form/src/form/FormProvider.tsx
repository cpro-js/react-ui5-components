import * as React from "react";
import { ReactNode } from "react";
import { FormProvider as ReactHookFormProvider } from "react-hook-form";

import { UseFormControllerReturn } from "./_internal/useFormController";
import { FormActionContext } from "./context/FormActionContext";

export interface FormProviderProps<FormValues extends {}>
  extends UseFormControllerReturn<FormValues> {
  children?: ReactNode | undefined;
}

export function FormProvider<FormValues extends {}>(
  props: FormProviderProps<FormValues>
) {
  const { context, children, actions } = props;

  return (
    <ReactHookFormProvider {...context}>
      <FormActionContext.Provider value={actions}>
        {children}
      </FormActionContext.Provider>
    </ReactHookFormProvider>
  );
}
