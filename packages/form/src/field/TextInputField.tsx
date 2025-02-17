import { InputDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { TextInput, TextInputProps } from "../component/TextInput";
import { useControlledField } from "../form/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldElement,
  FormFieldValidation,
} from "./types";

export type TextInputFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  TextInputProps,
  | "name"
  | "value"
  | "valueState"
  | "valueStateMessage"
  | "maxlength"
  | "onChange"
> &
  Pick<
    FormFieldValidation<FormValues, string>,
    "required" | "minLength" | "maxLength" | "validate"
  > &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    ) => void;
    onSubmit?: (
      event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    ) => void;
  };

export const TextInputField = forwardRef<
  FormFieldElement<any, any>,
  TextInputFieldProps<any, any>
>(
  (
    {
      name,
      required,
      minLength,
      maxLength,
      validate,
      dependsOn,
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
      minLength,
      maxLength,
      validate,
      dependsOn,
    });

    // support imperative form field api via ref
    useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

    // store input ref for internal usage
    const elementRef = useRef<InputDomRef>(null);

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current);

    const dispatchChangeEvent = useCustomEventDispatcher<
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-change",
      onEvent: onChange as unknown as (
        event: CustomEvent<FieldEventDetail<any, any>>
      ) => void,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-submit",
      onEvent: onSubmit as unknown as (
        event: CustomEvent<FieldEventDetail<any, any>>
      ) => void,
    });

    return (
      <TextInput
        {...props}
        ref={elementRef}
        name={field.name}
        // use empty string to reset value, undefined will be ignored by web component
        value={field.value === undefined ? "" : field.value}
        readonly={props.readonly || field.isValidating || field.isSubmitting}
        required={required}
        maxlength={
          maxLength != null
            ? typeof maxLength === "number"
              ? maxLength
              : maxLength.value
            : undefined
        }
        valueState={field.valueState}
        valueStateMessage={
          field.valueStateMessage != null && (
            <div slot="valueStateMessage">{field.valueStateMessage}</div>
          )
        }
        onInput={useEventCallback((event) => {
          // reset previous errors
          field.error && field.fieldApiRef.current.clearError();
          onInput?.(event);
        })}
        onChange={useEventCallback(async (event) => {
          field.fieldApiRef.current.setValue(event.target.value);

          const value = field.fieldApiRef.current.getValue();
          const valid = await field.fieldApiRef.current.validate();

          dispatchChangeEvent({
            name,
            value,
            valid,
            fieldApi: field.fieldApiRef.current,
          });
        })}
        onSubmit={useEventCallback(async (event) => {
          const value = field.fieldApiRef.current.getValue();
          const valid = await field.fieldApiRef.current.validate();

          dispatchSubmitEvent({
            name,
            value,
            valid,
            fieldApi: field.fieldApiRef.current,
          });
        })}
      />
    );
  }
) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  p: TextInputFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldElement<FormValues, FormFieldName>>;
  }
) => ReactElement;
