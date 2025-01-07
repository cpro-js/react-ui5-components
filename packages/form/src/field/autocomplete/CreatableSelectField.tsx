import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";
import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useController } from "react-hook-form";

import {
  CreatableSelect,
  CreatableSelectProps,
} from "../../component/autocomplete/CreatableSelect";
import { DefaultAutoCompleteOption } from "../../component/AutoCompleteModel";
import { useI18nValidationError } from "../../i18n/FormI18n";
import { FormFieldElement, FormFieldValidation } from "../types";
import { hasError } from "../util";

export type CreatableSelectFieldProps<
  T extends {} = DefaultAutoCompleteOption
> = Omit<
  CreatableSelectProps<T>,
  "name" | "value" | "inputValue" | "onChange" | "onValueChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const CreatableSelectField = forwardRef<
  FormFieldElement,
  CreatableSelectFieldProps
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
  const internalRef = useRef<HTMLInputElement>();
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
    <CreatableSelect
      {...props}
      ref={internalRef}
      name={field.name}
      value={field.value}
      onValueChange={field.onChange}
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
}) as <T extends {} = DefaultAutoCompleteOption>(
  p: CreatableSelectFieldProps<T> & {
    ref?: Ref<FormFieldElement | undefined>;
  }
) => ReactElement;
