import * as React from "react";
import { useMemo, useRef } from "react";
import {
  DefaultValues,
  SubmitHandler as HookFormSubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import {
  FormActions,
  FormSubmitHandler,
  InitialFormValues,
} from "../../field/types";

const noop = () => undefined;

export interface UseFormControllerProps<FormValues extends {}> {
  initialValues?: InitialFormValues<FormValues>;
  onSubmit: FormSubmitHandler<FormValues>;
}

export interface UseFormControllerReturn<FormValues extends {}> {
  /**
   * React hook form context
   */
  context: UseFormReturn<FormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
  handleReset: () => void;
  actions: FormActions<FormValues>;
}

export function useFormController<FormValues extends {}>(
  props: UseFormControllerProps<FormValues>
): UseFormControllerReturn<FormValues> {
  const { initialValues = {}, onSubmit } = props;

  const form = useForm<FormValues>({
    defaultValues: initialValues as DefaultValues<FormValues>,
    mode: "onChange", // Validation will trigger on the first blur event. After that, it will trigger on every change event.
    reValidateMode: "onSubmit", // Validation will trigger on the change event with each input, and lead to multiple re-renders.
    criteriaMode: "firstError",
    shouldUnregister: false,
  });

  const actions = useRef<FormActions<FormValues>>({
    focus: noop,
    setErrors: noop,
    getValues: () => {
      throw new Error("Not initialized yet");
    },
    setValues: noop,
    reset: noop,
    clear: noop,
    submit: noop,
  });

  const {
    handleSubmit: createHandleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    setFocus,
  } = form;

  actions.current.focus = useEventCallback((name) => {
    setFocus(name);
  });

  actions.current.setErrors = useEventCallback((errors, config) => {
    if (errors.length > 0) {
      errors.forEach(({ name, message }) => {
        setError(
          name,
          {
            type: "external-error",
            message: message,
          },
          { shouldFocus: false }
        );
      });

      if (config?.shouldFocus) {
        // TODO is there any way to ensure that the error order matches the input order?
        setFocus(errors[0].name);
      }
    }
  });

  actions.current.setValues = useEventCallback((values, options) => {
    values.forEach(({ name, value }) => {
      setValue(name, value, {
        shouldValidate: options?.shouldValidate ?? false,
        shouldDirty: options?.shouldDirty ?? false,
        shouldTouch: options?.shouldTouch,
      });
    });
  });

  actions.current.getValues = useEventCallback(() => {
    return getValues();
  });

  actions.current.reset = useEventCallback(() => {
    // reset other form state but keep defaultValues and form values
    reset(undefined, { keepDirtyValues: false });
  });

  actions.current.clear = useEventCallback(() => {
    // clear out all form fields
    // TODO doesn't work in FormFilterBar
    reset({} as DefaultValues<FormValues>);
  });

  const submitHandler: HookFormSubmitHandler<FormValues> = useEventCallback(
    async (data) => {
      return onSubmit(data as FormValues, actions.current);
    }
  );

  const handleSubmit: ReturnType<typeof createHandleSubmit> = useMemo(
    () => createHandleSubmit(submitHandler),
    [createHandleSubmit, submitHandler]
  );

  actions.current.submit = useEventCallback(() => handleSubmit());

  return {
    context: form,
    handleReset: actions.current.reset,
    handleSubmit: handleSubmit,
    actions: actions.current,
  };
}
