import "../form/formSupport";

import { MultiComboBoxDomRef, ValueState } from "@ui5/webcomponents-react";
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
  MultiSelect,
  MultiSelectItem,
  MultiSelectProps,
} from "../component/MultiSelect";
import { useI18nValidationError } from "../i18n/FormI18n";
import { FormFieldElement, FormFieldValidation } from "./types";
import { hasError } from "./util";

export type MultiSelectFieldProps<
  Item = MultiSelectItem,
  Value = string | number
> = Omit<
  MultiSelectProps<Item, Value>,
  "name" | "value" | "onSelectionChange" | "onBlur"
> &
  Pick<FormFieldValidation, "required"> & {
    name: string;
  };

export const MultiSelectField = forwardRef<
  FormFieldElement,
  MultiSelectFieldProps
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
  const internalRef = useRef<MultiComboBoxDomRef>();
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
    <MultiSelect
      {...props}
      ref={internalRef}
      name={field.name}
      value={field.value}
      onSelectionChange={(_, value) => {
        field.onChange(value);
      }}
      valueState={
        hasError(fieldState.error) ? ValueState.Error : ValueState.None
      }
      valueStateMessage={
        errorMessage != null && (
          <div slot="valueStateMessage">{errorMessage}</div>
        )
      }
      onBlur={(event) => {
        // ignore blur event when combobox items are clicked
        if ((event.target as any).open && event.relatedTarget != null) {
          return;
        }
        field.onBlur();
      }}
      required={required}
    />
  );
}) as <Item = MultiSelectItem, Value = string | number>(
  p: MultiSelectFieldProps<Item, Value> & {
    ref?: Ref<FormFieldElement | undefined>;
  }
) => ReactElement;
