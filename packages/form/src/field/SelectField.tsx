import { ComboBoxDomRef } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { Select, SelectItem, SelectProps } from "../component/Select";
import { useControlledField } from "../form/_internal/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldRef,
  FormFieldSubmitEvent,
  FormFieldValidation,
} from "./types";

export type SelectFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  Item = SelectItem,
  Value = string | number
> = Omit<
  SelectProps<Item, Value>,
  | "name"
  | "value"
  | "valueState"
  | "valueStateMessage"
  | "onChange"
  | "onSelectionChange"
> &
  Pick<FormFieldValidation<FormValues, string>, "required" | "validate"> &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<ComboBoxDomRef, FormValues, FormFieldName>
    ) => void;
    onSubmit?: (
      event: FormFieldSubmitEvent<ComboBoxDomRef, FormValues, FormFieldName>
    ) => void;
  };

export const SelectField = forwardRef<
  FormFieldRef<any, any>,
  SelectFieldProps<any, any>
>(
  (
    {
      name,
      required,
      validate,
      dependsOn,
      onKeyDown,
      onChange,
      onSubmit,
      onBlur,
      ...props
    },
    forwardedRef
  ) => {
    const field = useControlledField({
      name,
      required,
      validate,
      dependsOn,
    });

    // support imperative form field api via ref
    useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

    // store input ref for internal usage
    const elementRef = useRef<ComboBoxDomRef>(null);

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current);

    const dispatchChangeEvent = useCustomEventDispatcher<
      ComboBoxDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      ComboBoxDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-submit",
      onEvent: onSubmit,
    });

    return (
      <Select
        {...props}
        ref={elementRef}
        name={field.name}
        value={field.value}
        readonly={props.readonly || field.isValidating || field.isSubmitting}
        required={required}
        valueState={field.valueState}
        valueStateMessage={
          field.valueStateMessage != null && (
            <div slot="valueStateMessage">{field.valueStateMessage}</div>
          )
        }
        onKeyDown={useEventCallback((event) => {
          // reset previous errors
          field.error && field.fieldApiRef.current.clearError();
          onKeyDown?.(event);
        })}
        onChange={useEventCallback(async (event) => {
          // don't bubble up this event -> we trigger our own enhanced event
          event.stopPropagation();

          const value = event.detail.value;
          field.fieldApiRef.current.setValue(value);
          const valid = await field.fieldApiRef.current.validate();

          dispatchChangeEvent({
            name,
            value,
            valid,
            field: field.fieldApiRef.current,
            form: field.formApiRef.current,
          });
        })}
        onSubmit={useEventCallback(async (event) => {
          // don't bubble up this event -> we trigger our own enhanced event
          event.stopPropagation();

          const value = field.fieldApiRef.current.getValue();
          const valid = await field.fieldApiRef.current.validate();

          dispatchSubmitEvent({
            name,
            value,
            valid,
            field: field.fieldApiRef.current,
            form: field.formApiRef.current,
          });
        })}
        onBlur={useEventCallback((event) => {
          onBlur?.(event);
          field.onBlur();
        })}
      />
    );
  }
) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  Item = SelectItem,
  Value = string | number
>(
  p: SelectFieldProps<FormValues, FormFieldName, Item, Value> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
