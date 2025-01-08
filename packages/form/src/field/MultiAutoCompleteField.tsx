import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";
import {
  MutableRefObject,
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useController } from "react-hook-form";

import { DefaultAutoCompleteOption } from "../component/AutoCompleteModel";
import {
  MultiAutoComplete,
  MultiAutoCompleteProps,
} from "../component/MultiAutoComplete";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldElement, FormFieldValidation } from "./types";
import { hasError } from "./util";

export type MultiAutoCompleteFieldProps<T = DefaultAutoCompleteOption> = Omit<
  MultiAutoCompleteProps<T>,
  "name" | "values" | "onChange" | "onSelectionChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const MultiAutoCompleteField = forwardRef<
  FormFieldElement,
  MultiAutoCompleteFieldProps
>(({ name, required, ...props }, forwardedRef) => {
  const rules: Partial<FormFieldValidation> = useMemo(
    () => ({
      required,
    }),
    [required]
  );

  const getValidationErrorMessage = useI18nValidationError(name, rules);

  const { field, fieldState } = useController({
    name: name,
    rules,
  });

  // store input ref for intenral usage
  const internalRef = useRef<MultiAutoComplete<DefaultAutoCompleteOption>>();
  // forward outer ref to custom element
  useImperativeHandle(forwardedRef, () => ({
    focus() {
      if (internalRef.current != null) {
        internalRef.current.focus();
      }
    },
  }));
  // forward field ref to stored internal input ref
  useImperativeHandle(field.ref, () => internalRef.current);

  // get error message (Note: undefined fallbacks to default message of ui5 component)
  const errorMessage = hasError(fieldState.error)
    ? getValidationErrorMessage(fieldState.error, field.value)
    : undefined;

  return (
    <MultiAutoComplete
      {...props}
      ref={
        internalRef as MutableRefObject<
          MultiAutoComplete<DefaultAutoCompleteOption>
        >
      }
      name={field.name}
      values={field.value}
      onChange={(_, value) => field.onChange(value)}
      valueState={
        hasError(fieldState.error) ? ValueState.Negative : ValueState.None
      }
      valueStateMessage={
        errorMessage != null && (
          <div slot="valueStateMessage">{errorMessage}</div>
        )
      }
      onBlur={field.onBlur}
      required={required}
    />
  );
}) as <T = DefaultAutoCompleteOption>(
  p: MultiAutoCompleteFieldProps<T> & {
    ref?: Ref<FormFieldElement | undefined>;
  }
) => ReactElement;
