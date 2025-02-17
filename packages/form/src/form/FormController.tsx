import * as React from "react";
import { CSSProperties, FormEvent, ReactNode } from "react";
import { useEventCallback } from "usehooks-ts";

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

  const handleRestrictedSubmit = useEventCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const nativeEvent = event.nativeEvent as SubmitEvent;

      const submitter = nativeEvent.submitter?.tagName.toLowerCase();
      // restrict submits to button
      if (submitter && ["ui5-button".includes(submitter)]) {
        handleSubmit(event);
      }
    }
  );

  return (
    <form
      id={id}
      onSubmit={handleRestrictedSubmit}
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
