import * as React from "react";
import { ReactNode } from "react";
import { FormProvider as ReactHookFormProvider } from "react-hook-form";

import { FormActionContext } from "./context/FormActionContext";
import { UseFormControllerReturn } from "./useFormController";

export interface FormProviderProps<FormValues extends {}>
  extends UseFormControllerReturn<FormValues> {
  children?: ReactNode | undefined;
}

export function FormProvider<FormValues extends {}>(
  props: FormProviderProps<FormValues>
) {
  const { context, actions, children } = props;

  return (
    <ReactHookFormProvider {...context}>
      <FormActionContext.Provider value={actions}>
        {children}
      </FormActionContext.Provider>
    </ReactHookFormProvider>
  );
}
