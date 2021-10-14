import * as React from "react";
import { CSSProperties, ReactNode } from "react";

import { FormProvider } from "./FormProvider";
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

  const form = useFormController<FormValues>({
    initialValues,
    onSubmit,
  });

  const { handleSubmit, handleReset } = form;

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={className}
      style={style}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
