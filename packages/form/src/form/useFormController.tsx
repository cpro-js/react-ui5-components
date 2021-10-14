import { klona } from "klona/json";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";

import {
  FormActionClearForm,
  FormActionResetForm,
  FormActionSetErrors,
  FormActionSetValues,
  FormActionSubmitForm,
  FormActions,
  PartialFormValues,
} from "../field/types";

const noop = () => undefined;

export interface UseFormControllerProps<FormValues extends {}> {
  initialValues?: PartialFormValues<FormValues>;
  onSubmit: (
    values: FormValues,
    actions: FormActions<FormValues>
  ) => void | Promise<void>;
}

export interface UseFormControllerReturn<FormValues extends {}> {
  /**
   * React hook form context
   */
  context: UseFormReturn<FormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleReset: () => void;
  setErrors: FormActionSetErrors<FormValues>;
  setValues: FormActionSetValues<FormValues>;
  reset: FormActionResetForm<FormValues>;
  clear: FormActionClearForm<FormValues>;
  submit: FormActionSubmitForm<FormValues>;
}

export function useFormController<FormValues extends {}>(
  props: UseFormControllerProps<FormValues>
): UseFormControllerReturn<FormValues> {
  const { initialValues, onSubmit } = props;

  // store initial values & deep clone initial values to bypass mutations
  const initialValuesRef = useRef<typeof initialValues>(
    initialValues != null ? klona(initialValues) : undefined
  );

  const form = useForm<FormValues>({
    defaultValues: initialValuesRef.current,
    mode: "onTouched", // Validation will trigger on the first blur event. After that, it will trigger on every change event.
    reValidateMode: "onChange", // Validation will trigger on the change event with each input, and lead to multiple re-renders.
    criteriaMode: "firstError",
    shouldUnregister: false,
  });

  const { handleSubmit, reset, trigger, setValue, setError, setFocus } = form;

  const actions = useRef<FormActions<FormValues>>({
    setErrors: noop,
    setValues: noop,
    reset: noop,
    clear: noop,
    submit: noop,
  });

  const setErrors: FormActionSetErrors<FormValues> = useCallback(
    (errors, config) => {
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
    },
    [setError, setFocus]
  );

  const setValues: FormActionSetValues<FormValues> = useCallback(
    (values) => {
      values.forEach(({ name, value }) => {
        setValue(name, value, {
          shouldValidate: false,
          shouldDirty: false,
        });
      });
    },
    [setValue]
  );

  const resetForm: FormActionResetForm<FormValues> = useCallback(() => {
    if (initialValuesRef.current != null) {
      reset(initialValuesRef.current);
    } else {
      reset();
    }
  }, [reset]);

  const clearForm: FormActionClearForm<FormValues> = useCallback(() => {
    reset({} as PartialFormValues<FormValues>);
  }, [reset]);

  const submitHandler: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      // need to trigger validation to ensure everything is really ok
      const valid = await trigger();

      if (valid) {
        // call submit
        return onSubmit(data as FormValues, actions.current);
      }
    },
    [trigger, onSubmit]
  );

  const submitForm = useMemo(
    () => handleSubmit(submitHandler),
    [handleSubmit, submitHandler]
  );

  useEffect(() => {
    // refresh action ref if any of our methods changes
    actions.current = {
      setErrors: setErrors,
      setValues: setValues,
      reset: resetForm,
      clear: clearForm,
      submit: submitForm,
    };
  }, [setErrors, setValues, resetForm, clearForm, submitForm]);

  return {
    context: form,
    handleReset: resetForm,
    handleSubmit: submitForm,
    setErrors: setErrors,
    setValues: setValues,
    reset: resetForm,
    clear: clearForm,
    submit: submitForm,
  };
}
