import * as React from "react";
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { FormChangeHandler } from "../field/types";
import { FormListener } from "./FormListener";
import { FormProvider } from "./FormProvider";
import {
  UseFormControllerProps,
  UseFormControllerReturn,
  useFormController,
} from "./useFormController";
import { UseFormListenerCallback } from "./useFormListener";

export interface FormControllerProps<FormValues extends {}>
  extends UseFormControllerProps<FormValues> {
  id?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
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

  // ref to store latest version of form
  const formRef = useRef<UseFormControllerReturn<FormValues>>(form);
  useEffect(() => {
    formRef.current = form;
  });

  const onChangeHandler: UseFormListenerCallback<FormValues> = useCallback(
    (values) => {
      if (onChange != null) {
        const { setValues, reset, setErrors, clear, submit } = formRef.current;

        onChange(values, { setValues, reset, setErrors, clear, submit });
      }
    },
    [onChange]
  );

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={className}
      style={style}
    >
      <FormProvider {...form}>
        {onChange != null && <FormListener onChange={onChangeHandler} />}
        {children}
      </FormProvider>
    </form>
  );
}
