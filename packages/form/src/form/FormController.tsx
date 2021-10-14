import * as React from "react";
import { CSSProperties, ReactNode } from "react";
import { FormProvider } from "react-hook-form";

import { FormActionContext } from "./context/FormActionContext";
import { UseFormControllerProps, useFormController } from "./useFormController";

export interface FormControllerProps<FormValues extends {}>
  extends UseFormControllerProps<FormValues> {
  id?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function FormController<FormValues extends {}>(
  props: FormControllerProps<FormValues>
) {
  const { id, children, initialValues, onSubmit, className, style } = props;

  const { context, handleSubmit, handleReset, actions } =
    useFormController<FormValues>({
      initialValues,
      onSubmit,
    });

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={className}
      style={style}
    >
      <FormProvider {...context}>
        <FormActionContext.Provider value={actions}>
          {children}
        </FormActionContext.Provider>
      </FormProvider>
    </form>
  );
}
