import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { Ui5DomRef } from "@ui5/webcomponents-react";
import pDebounce from "p-debounce";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import {
  FieldError,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RefCallBack,
  UseControllerProps,
  useController,
  useFormContext,
} from "react-hook-form";
import { useDebounceCallback, useEventCallback } from "usehooks-ts";

import {
  FormActions,
  FormFieldActions,
  FormFieldCommonProps,
  FormFieldValidation,
} from "../../field/types";
import { hasError } from "../../field/util";
import { useI18nValidationError } from "../../i18n/FormI18n";
import { useFormActions } from "./useFormActions";

const noop = () => undefined;

export interface UseControlledFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> extends FormFieldCommonProps<FormValues, FormFieldName>,
    FormFieldValidation<FormValues, any> {
  ref?: MutableRefObject<{ focus: () => unknown } | null>;
}

export interface UseControlledFieldsReturn<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> {
  ref: RefCallBack;
  name: FieldPath<FormValues>;
  value: FieldPathValue<FormValues, FormFieldName>;
  onChange: (value: FieldPathValue<FormValues, FormFieldName>) => void;
  onBlur: () => void;
  error: FieldError | undefined;
  valueState: ValueState | keyof typeof ValueState;
  valueStateMessage: string | undefined;
  isValidating: boolean;
  isSubmitting: boolean;
  fieldApiRef: MutableRefObject<FormFieldActions<FormValues, FormFieldName>>;
  formApiRef: MutableRefObject<FormActions<FormValues>>;
}

export const useControlledField = <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  props: UseControlledFieldProps<FormValues, FormFieldName>
): UseControlledFieldsReturn<FormValues, FormFieldName> => {
  const {
    ref,
    name,
    dependsOn,
    min,
    max,
    minLength,
    maxLength,
    validate,
    required,
  } = props;

  const controllerProps: UseControllerProps<
    FormValues,
    FieldPath<FormValues>
  > = {
    name: name,
    // TODO rules via ref / stable object ?? --> check if we can update them!
    rules: {
      max,
      min,
      minLength,
      maxLength,
      // @ts-ignore TODO try to fix it
      validate,
      required,
    },
  };

  const {
    setError,
    clearErrors,
    getValues,
    setValue,
    trigger,
    setFocus,
    watch,
    getFieldState,
  } = useFormContext<FormValues>();

  const formActions = useFormActions<FormValues>();

  const fieldApiRef = useRef<FormFieldActions<FormValues, FormFieldName>>({
    validate: () => Promise.resolve(true),
    clearError: noop,
    setError: noop,
    getValue: noop,
    setValue: noop,
    focus: noop,
  });

  const formApiRef = useRef<FormActions<FormValues>>(formActions);

  useMemo(() => {
    // debounce validation within short time to trigger same validation for onChange / onSubmit once
    fieldApiRef.current.validate = pDebounce(() => trigger(name), 50, {
      before: true,
    });
    fieldApiRef.current.clearError = () => clearErrors(name);
    fieldApiRef.current.setError = (error) => setError(name, error);
    fieldApiRef.current.getValue = () => getValues(name);
    fieldApiRef.current.setValue = (value) => {
      if (getFieldState(name).error) {
        clearErrors(name);
      }
      setValue(name, value, {
        shouldDirty: true,
        shouldValidate: false,
        shouldTouch: true,
      });
    };
    fieldApiRef.current.focus = () =>
      ref?.current ? ref?.current?.focus() : setFocus(name);
  }, [
    name,
    getFieldState,
    setError,
    clearErrors,
    getValues,
    setValue,
    trigger,
    ref,
  ]);

  const revalidateIfDirty = useEventCallback(
    useDebounceCallback(
      () => {
        if (getFieldState(name).isTouched && getFieldState(name).isDirty) {
          // values changed -> revalidate
          void fieldApiRef.current.validate();
        }
      },
      10,
      { trailing: true, leading: false }
    )
  );

  // dependsOn
  useEffect(() => {
    if (!dependsOn || dependsOn.length === 0) {
      return;
    }

    const { unsubscribe } = watch((_, { name }) => {
      if (name && dependsOn.includes(name as FieldPath<FormValues>)) {
        // values changed -> revalidate
        revalidateIfDirty();
      }
    });

    return () => unsubscribe();
  }, [dependsOn, revalidateIfDirty]);

  const getValidationErrorMessage = useI18nValidationError(
    name,
    controllerProps.rules as FormFieldValidation<FormValues, any>
  );
  const {
    field,
    fieldState,
    formState: { isSubmitting },
  } = useController(controllerProps);

  // get error message (Note: undefined fallbacks to default message of ui5 component)
  const errorMessage = hasError(fieldState.error)
    ? getValidationErrorMessage(fieldState.error, field.value)
    : undefined;

  return {
    ref: field.ref,
    name: field.name,
    value: field.value as FieldPathValue<FormValues, FormFieldName>,
    onChange: field.onChange,
    onBlur: field.onBlur,
    error: fieldState.error,
    valueState: hasError(fieldState.error) ? "Negative" : "None",
    valueStateMessage: errorMessage,
    isValidating: fieldState.isValidating,
    isSubmitting: isSubmitting,
    fieldApiRef: fieldApiRef,
    formApiRef: formApiRef,
  };
};
