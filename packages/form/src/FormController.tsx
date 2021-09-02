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

export interface FormControllerProps<FormValues extends {}> {
  id?: string;
  initialValues?: DefaultValues<FormValues>;
  onSubmit: (values: UnpackNestedValue<FormValues>) => void | Promise<void>;
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

  const { handleSubmit, reset } = form;

  const enhancedOnSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      if (form.formState.isValid) {
        // call submit
        return onSubmit(data);
      }
    },
    [form, onSubmit]
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
