import { klona } from "klona/json";
import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import {
  DefaultValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { UnpackNestedValue } from "react-hook-form/dist/types/form";

import { FormActions } from "../field/types";

export interface UseFormControllerProps<FormValues extends {}> {
  initialValues?: DefaultValues<FormValues>;
  onSubmit: (
    values: UnpackNestedValue<FormValues>,
    actions: FormActions<FormValues>
  ) => void | Promise<void>;
}

export function useFormController<FormValues extends {}>(
  props: UseFormControllerProps<FormValues>
): {
  context: UseFormReturn<FormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleReset: () => void;
  actions: FormActions<FormValues>;
} {
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

  const formActions: FormActions<FormValues> = useMemo(
    () => ({
      setErrors(errors, config): void {
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
      setValues(values): void {
        values.forEach(({ name, value }) => {
          setValue(name, value, {
            shouldValidate: false,
            shouldDirty: false,
          });
        });
      },
      reset(): void {
        reset(
          initialValuesRef.current != null
            ? initialValuesRef.current
            : ({} as DefaultValues<FormValues>)
        );
      },
      clear(): void {
        reset({} as DefaultValues<FormValues>);
      },
      // todo refactor
      submit(): void {},
    }),
    [reset, setValue, setError, setFocus]
  );

  const enhancedOnSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      // need to trigger validation to ensure everything is really ok
      const valid = await trigger();

      if (valid) {
        // call submit
        return onSubmit(data, formActions);
      }
    },
    [trigger, onSubmit, formActions]
  );

  const handleReset = useCallback(() => {
    // call submit
    reset(
      initialValuesRef.current != null
        ? initialValuesRef.current
        : ({} as DefaultValues<FormValues>)
    );
  }, [reset]);

  return {
    context: form,
    handleSubmit: handleSubmit(enhancedOnSubmit),
    handleReset: handleReset,
    actions: {
      ...formActions,
      submit: handleSubmit(enhancedOnSubmit),
    },
  };
}
