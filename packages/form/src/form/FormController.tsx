import * as React from "react";
import { CSSProperties, ReactNode } from "react";

import { FormChangeHandler } from "../field/types";
import { FormListener } from "./FormListener";
import { FormProvider } from "./FormProvider";
import { UseFormControllerProps, useFormController } from "./useFormController";

export interface FormControllerProps<FormValues extends {}>
  extends UseFormControllerProps<FormValues> {
  /** id of form */
  id?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** custom event handler that triggers when any value of the form is changed  */
  onChange?: FormChangeHandler<FormValues>;
}

export function FormController<FormValues extends {}>(
  props: FormControllerProps<FormValues>
) {
  const { id, children, initialValues, onSubmit, onChange, className, style } =
    props;

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
      noValidate
    >
      <FormProvider {...form}>
        {onChange != null && <FormListener onChange={onChange} />}
        {children}
      </FormProvider>
    </form>
  );
}
