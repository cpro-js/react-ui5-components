import { MultiComboBoxDomRef } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import {
  MultiSelect,
  MultiSelectItem,
  MultiSelectProps,
} from "../component/MultiSelect";
import { useControlledField } from "../form/_internal/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldRef,
  FormFieldValidation,
} from "./types";

export type MultiSelectFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  Item = MultiSelectItem,
  Value = string | number
> = Omit<
  MultiSelectProps<Item, Value>,
  | "name"
  | "value"
  | "valueState"
  | "valueStateMessage"
  | "onSelectionChange"
  | "onChange"
> &
  Pick<
    FormFieldValidation<FormValues, Array<string | number>>,
    "required" | "validate"
  > &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<
        MultiComboBoxDomRef,
        FormValues,
        FormFieldName
      >
    ) => void;
    // onSubmit?: (
    //   event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    // ) => void;
  };

export const MultiSelectField = forwardRef<
  FormFieldRef<any, any>,
  MultiSelectFieldProps<any, any>
>(
  (
    {
      name,
      required,
      validate,
      dependsOn,
      onKeyDown,
      onChange,
      onBlur,
      ...props
    },
    forwardedRef
  ) => {
    // store input ref for internal usage
    const elementRef = useRef<MultiComboBoxDomRef>(null);

    const field = useControlledField({
      ref: elementRef,
      name,
      required,
      validate,
      dependsOn,
    });
    // support imperative form field api via ref
    useImperativeHandle(forwardedRef, () => field.fieldApiRef.current, [
      field.fieldApiRef,
    ]);

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current, []);

    const dispatchChangeEvent = useCustomEventDispatcher<
      MultiComboBoxDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-change",
      onEvent: onChange,
    });

    return (
      <MultiSelect<MultiSelectItem, string | number>
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
        onSelectionChange={useEventCallback(async (event, value) => {
          // don't bubble up this event -> we trigger our own enhanced event
          event.stopPropagation();

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
  Item = MultiSelectItem,
  Value = string | number
>(
  p: MultiSelectFieldProps<FormValues, FormFieldName, Item, Value> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
