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

import { NumberInput, NumberInputProps } from "../component/number/NumberInput";
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

export type NumberInputFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  NumberInputProps,
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

export const NumberInputField = forwardRef<
  FormFieldElement<any, any>,
  NumberInputFieldProps<any, any>
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
      <NumberInput
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
            fieldApi: field.fieldApiRef.current,
          });

          if (submit.shouldFireSubmitOnChange()) {
            dispatchSubmitEvent({
              name,
              value,
              valid,
              fieldApi: field.fieldApiRef.current,
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
              fieldApi: field.fieldApiRef.current,
            });
          }
        })}
      />
    );
  }
) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  p: NumberInputFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldElement<FormValues, FormFieldName>>;
  }
) => ReactElement;
