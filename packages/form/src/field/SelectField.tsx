import "../form/formSupport";

import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";
import { ComboBoxDomRef } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useController } from "react-hook-form";

import { Select, SelectItem, SelectProps } from "../component/Select";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldElement, FormFieldValidation } from "./types";
import { hasError } from "./util";

export type SelectFieldProps<Item = SelectItem, Value = string | number> = Omit<
  SelectProps<Item, Value>,
  "name" | "value" | "onChange" | "onSelectionChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const SelectField = forwardRef<FormFieldElement, SelectFieldProps>(
  ({ name, required, ...props }, forwardedRef) => {
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
    const internalRef = useRef<ComboBoxDomRef>();
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
      <Select
        {...props}
        ref={internalRef}
        name={field.name}
        value={field.value}
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
  }
) as <Item = SelectItem, Value = string | number>(
  p: SelectFieldProps<Item, Value> & { ref?: Ref<FormFieldElement | undefined> }
) => ReactElement;
