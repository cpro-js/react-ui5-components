import * as React from "react";
import { CSSProperties, ReactElement, ReactNode, Ref, forwardRef } from "react";

import { FormChangeHandler, FormRef } from "../field/types";
import { FormProvider } from "./FormProvider";
import { UseFormControllerProps, useFormController } from "./useFormController";

export interface FormControllerProps<FormValues extends {}>
  extends UseFormControllerProps<FormValues> {
  id?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onChange?: FormChangeHandler<FormValues>;
}

export const FormController = forwardRef<FormRef<{}>, FormControllerProps<{}>>(
  (props, formRef) => {
    const {
      id,
      children,
      initialValues,
      onSubmit,
      onChange,
      className,
      style,
    } = props;

    const form = useFormController<{}>({
      initialValues,
      onSubmit,
      onChange,
      ref: formRef,
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
) as <FormValues>(
  p: FormControllerProps<FormValues> & {
    ref?: Ref<FormRef<FormValues> | undefined>;
  }
) => ReactElement;
