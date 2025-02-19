import { Ui5DomRef } from "@ui5/webcomponents-react";
import * as React from "react";
import {
  CSSProperties,
  FormEvent,
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import {
  FieldEventDetail,
  FormActions,
  FormChangeHandler,
  FormFieldChangeEvent,
  FormFieldSubmitEvent,
} from "../field/types";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import { FormListener } from "./_internal/FormListener";
import {
  UseFormControllerProps,
  useFormController,
} from "./_internal/useFormController";
import { FormProvider } from "./FormProvider";

export type FormControllerRef<FormValues extends {}> = FormActions<FormValues>;

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

export const FormController = forwardRef<
  FormControllerRef<{}>,
  FormControllerProps<{}>
>((props, forwardedRef) => {
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

  const form = useFormController<any>({
    initialValues,
    onSubmit,
  });

  // support imperative form field api via ref
  useImperativeHandle(forwardedRef, () => form.actions);

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

  useCustomEventDispatcher<Ui5DomRef, FieldEventDetail<{}, FieldPath<{}>>>({
    ref: ref,
    name: "field-change",
    onEvent: onFieldChange,
  });

  useCustomEventDispatcher<Ui5DomRef, FieldEventDetail<{}, FieldPath<{}>>>({
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
}) as <FormValues extends {}>(
  p: FormControllerProps<FormValues> & {
    ref?: Ref<FormControllerRef<FormValues> | undefined>;
  }
) => ReactElement;
