import { Ui5DomRef } from "@ui5/webcomponents-react";
import * as React from "react";
import { CSSProperties, FormEvent, ReactNode, useRef } from "react";
import { FieldPath } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import {
  FieldEventDetail,
  FormChangeHandler,
  FormFieldChangeEvent,
  FormFieldSubmitEvent,
} from "../field/types";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
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

  onFieldChange?: (
    event: FormFieldChangeEvent<Ui5DomRef, FormValues, FieldPath<FormValues>>
  ) => void;
  onFieldSubmit?: (
    event: FormFieldSubmitEvent<Ui5DomRef, FormValues, FieldPath<FormValues>>
  ) => void;
}

export function FormController<FormValues extends {}>(
  props: FormControllerProps<FormValues>
) {
  const {
    id,
    children,
    initialValues,
    onSubmit,
    onChange,
    onFieldChange,
    onFieldSubmit,
    className,
    style,
  } = props;

  const ref = useRef<HTMLFormElement>(null);

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
      if (submitter && ["ui5-button"].includes(submitter)) {
        handleSubmit(event);
      }
    }
  );

  useCustomEventDispatcher<
    Ui5DomRef,
    FieldEventDetail<FormValues, FieldPath<FormValues>>
  >({
    ref: ref,
    name: "field-change",
    onEvent: onFieldChange,
  });

  useCustomEventDispatcher<
    Ui5DomRef,
    FieldEventDetail<FormValues, FieldPath<FormValues>>
  >({
    ref: ref,
    name: "field-submit",
    onEvent: onFieldSubmit,
  });

  return (
    <form
      ref={ref}
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
