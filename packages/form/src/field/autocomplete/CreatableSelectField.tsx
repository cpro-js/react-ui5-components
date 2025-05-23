import { InputDomRef } from "@ui5/webcomponents-react";
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
  CreatableSelect,
  CreatableSelectProps,
} from "../../component/autocomplete/CreatableSelect";
import { DefaultAutoCompleteOption } from "../../component/AutoCompleteModel";
import { useControlledField } from "../../form/_internal/useField";
import { useCustomEventDispatcher } from "../../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldRef,
  FormFieldValidation,
} from "../types";

export type CreatableSelectFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  T extends {} = DefaultAutoCompleteOption
> = Omit<
  CreatableSelectProps<T>,
  | "name"
  | "value"
  | "inputValue"
  | "valueState"
  | "valueStateMessage"
  | "onChange"
  | "onSelectionChange"
> &
  Pick<FormFieldValidation<FormValues, string>, "required" | "validate"> &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    ) => void;
  };

export const CreatableSelectField = forwardRef<
  FormFieldRef<any, any>,
  CreatableSelectFieldProps<any, any>
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
    const elementRef = useRef<InputDomRef>(null);

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
      InputDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-change",
      onEvent: onChange,
    });

    return (
      <CreatableSelect
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
        onValueChange={useEventCallback(async (value) => {
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
  T extends {} = DefaultAutoCompleteOption
>(
  p: CreatableSelectFieldProps<FormValues, FormFieldName, T> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
