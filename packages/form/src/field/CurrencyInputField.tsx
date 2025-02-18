import { InputDomRef } from "@ui5/webcomponents-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import {
  CurrencyInput,
  CurrencyInputProps,
} from "../component/number/CurrencyInput";
import { useFireSubmit } from "../component/util";
import { useControlledField } from "../form/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldElement,
  FormFieldSubmitEvent,
  FormFieldValidation,
} from "./types";

export type CurrencyInputFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  CurrencyInputProps,
  "name" | "value" | "valueState" | "valueStateMessage" | "max" | "onChange"
> &
  Pick<
    FormFieldValidation<FormValues, number>,
    "required" | "min" | "max" | "validate"
  > &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    ) => void;
    onSubmit?: (
      event: FormFieldSubmitEvent<InputDomRef, FormValues, FormFieldName>
    ) => void;
  };
export const CurrencyInputField = forwardRef<
  FormFieldElement<any, any>,
  CurrencyInputFieldProps<any, any>
>(
  (
    {
      name,
      required,
      min,
      max,
      validate,
      dependsOn,
      onFocus,
      onKeyDown,
      onKeyUp,
      onInput,
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
      min,
      max,
      // @ts-ignore TODO type mapping
      validate,
      dependsOn,
    });
    // support imperative form field api via ref
    useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

    // store input ref for internal usage
    const elementRef = useRef<InputDomRef>(null);

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current);

    const submit = useFireSubmit();

    const dispatchChangeEvent = useCustomEventDispatcher<
      InputDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      InputDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-submit",
      onEvent: onSubmit,
    });

    return (
      <CurrencyInput
        {...props}
        ref={elementRef}
        name={field.name}
        value={field.value}
        readonly={props.readonly || field.isValidating || field.isSubmitting}
        required={required}
        aria-valuemin={
          min != null ? (typeof min === "number" ? min : min.value) : undefined
        }
        aria-valuemax={
          max != null ? (typeof max === "number" ? max : max.value) : undefined
        }
        valueState={field.valueState}
        valueStateMessage={
          field.valueStateMessage != null && (
            <div slot="valueStateMessage">{field.valueStateMessage}</div>
          )
        }
        onFocus={useEventCallback((event) => {
          submit.focus();
        })}
        onKeyDown={useEventCallback((event) => {
          // reset previous errors
          field.error && field.fieldApiRef.current.clearError();
          submit.keyDown(event);
        })}
        onChange={useEventCallback(async (event, value) => {
          // don't bubble up this event -> we trigger our own enhanced event
          event.stopPropagation();

          field.fieldApiRef.current.setValue(value);
          const valid = await field.fieldApiRef.current.validate();

          dispatchChangeEvent({
            name,
            value,
            valid,
            field: field.fieldApiRef.current,
          });

          if (submit.shouldFireSubmitOnChange()) {
            dispatchSubmitEvent({
              name,
              value,
              valid,
              field: field.fieldApiRef.current,
            });
          }
        })}
        onKeyUp={useEventCallback(async (event, value) => {
          onKeyUp?.(event, value);
          if (submit.shouldFireSubmitOnKeyUp()) {
            const value = field.fieldApiRef.current.getValue();
            const valid = await field.fieldApiRef.current.validate();

            dispatchSubmitEvent({
              name,
              value,
              valid,
              field: field.fieldApiRef.current,
            });
          }
        })}
        onBlur={useEventCallback((event) => {
          onBlur?.(event);
          field.onBlur();
        })}
      />
    );
  }
);
