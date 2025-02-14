import { useDebounceCallback } from "@react-hook/debounce";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import pDebounce from "p-debounce";
import { RefObject, useEffect, useMemo, useRef } from "react";
import {
  FieldError,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RefCallBack,
  UseControllerProps,
  UseFormGetFieldState,
  useController,
  useFormContext,
} from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { FormFieldValidation } from "../field/types";
import { hasError } from "../field/util";
import { useI18nValidationError } from "../i18n/FormI18n";
import { useFormActions } from "./useFormActions";

export interface FormFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> extends FormFieldValidation<
    FormValues,
    FieldPathValue<FormValues, FormFieldName>
  > {
  name: FieldPath<FormValues>;
  dependsOn?:
    | string
    | string[]
    | FieldPath<FormValues>
    | FieldPath<FormValues>[];
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
  error: boolean;
  valueState: ValueState | keyof typeof ValueState;
  valueStateMessage: string | undefined;
  busy: boolean;
  getFieldState: UseFormGetFieldState<FormValues>;
}

export const useControlledField = <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  props: FormFieldProps<FormValues, FormFieldName>
): UseControlledFieldsReturn<FormValues, FormFieldName> => {
  const {
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

  const { watch, getFieldState } = useFormContext();

  const actionsRef = useFieldActionRef(name);

  const revalidateIfDirty = useEventCallback(
    useDebounceCallback(
      () => {
        if (getFieldState(name).isTouched) {
          // values changed -> revalidate
          void actionsRef.current.validate();
        }
      },
      10,
      false
    )
  );

  // dependsOn
  useEffect(() => {
    if (!dependsOn || dependsOn.length === 0) {
      return;
    }

    const { unsubscribe } = watch((_, { name }) => {
      console.log("watch", name);
      if (name && dependsOn.includes(name)) {
        // values changed -> revalidate
        revalidateIfDirty();
      }
    });

    return () => unsubscribe();
  }, [dependsOn, revalidateIfDirty]);

  const getValidationErrorMessage = useI18nValidationError(
    name,
    controllerProps.rules
  );
  const { field, fieldState, formState } = useController(controllerProps);

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
    error: hasError(fieldState.error),
    valueState: hasError(fieldState.error) ? "Negative" : "None",
    valueStateMessage: errorMessage,
    busy: fieldState.isValidating,
    getFieldState,
  };
};

export interface FieldActions<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> {
  validate(): Promise<boolean>;

  clearError(): void;

  setError(error: FieldError): void;

  setValue(value: FieldPathValue<FormValues, FormFieldName>): void;

  getValue(): FieldPathValue<FormValues, FormFieldName> | undefined;

  focusField(name: FieldPath<FormValues>): void;

  submitForm(): void;
}

const noop = () => undefined;
export const useFieldActionRef = <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  name: string
): RefObject<FieldActions<FormValues, FormFieldName>> => {
  const { setError, clearErrors, getValues, setValue, trigger, setFocus } =
    useFormContext();
  const { submit } = useFormActions();

  const actionsRef = useRef<FieldActions<FormValues, FormFieldName>>({
    validate: () => Promise.resolve(true),
    clearError: noop,
    setError: noop,
    getValue: noop,
    setValue: noop,
    focusField: noop,
    submitForm: noop,
  });

  useMemo(() => {
    // debounce validation within short time to trigger same validation for onChange / onSubmit once
    actionsRef.current.validate = pDebounce(() => trigger(name), 50, {
      before: true,
    });
    actionsRef.current.clearError = () => clearErrors(name);
    actionsRef.current.setError = (error) => setError(name, error);
    actionsRef.current.getValue = () => getValues(name);
    actionsRef.current.setValue = (value) =>
      setValue(name, value, {
        shouldDirty: true,
        shouldValidate: false,
        shouldTouch: true,
      });
    actionsRef.current.focusField = (name) => setFocus(name);
    actionsRef.current.submitForm = () => submit();
  }, [name, setError, clearErrors, getValues, setValue, trigger]);

  return actionsRef;
};
