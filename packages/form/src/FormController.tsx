import { klona } from "klona/json";
import * as React from "react";
import { CSSProperties, ReactNode, useCallback, useMemo } from "react";
import {
  DefaultValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { UnpackNestedValue } from "react-hook-form/dist/types/form";

import { FormActions } from "./field/types";

export interface FormControllerProps<FormValues extends {}> {
  id?: string;
  initialValues?: DefaultValues<FormValues>;
  onSubmit: (
    values: UnpackNestedValue<FormValues>,
    actions?: FormActions<FormValues>
  ) => void | Promise<void>;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function useFormController<FormValues extends {}>(
  props: FormControllerProps<FormValues>
): {
  context: UseFormReturn<FormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleReset: () => void;
} {
  const { initialValues, onSubmit } = props;

  // deep clone initial values to bypass mutations
  const clonedInitialValues = useMemo(() => {
    return initialValues != null ? klona(initialValues) : undefined;
  }, [initialValues]);

  const form = useForm<FormValues>({
    defaultValues: clonedInitialValues,
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
        reset();
      },
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
    reset();
  }, [reset]);

  return {
    context: form,
    handleSubmit: handleSubmit(enhancedOnSubmit),
    handleReset: handleReset,
  };
}

export function FormController<FormValues extends {}>(
  props: FormControllerProps<FormValues>
) {
  const { id, children, initialValues, onSubmit, className, style } = props;

  const { context, handleSubmit, handleReset } = useFormController<FormValues>({
    initialValues,
    onSubmit,
  });

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={className}
      style={style}
    >
      <FormProvider {...context}>{children}</FormProvider>
    </form>
  );
}
