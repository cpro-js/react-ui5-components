import { BusyIndicator, InputDomRef } from "@ui5/webcomponents-react";
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
import {
  FieldActions,
  useControlledField,
  useFieldActionRef,
} from "../form/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import { FormFieldElement, FormFieldValidation } from "./types";

export type FieldEventDetail<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = {
  name: FormFieldName;
  value: string;
  valid: boolean;
  formApi: FieldActions<FormValues, FormFieldName>;
};

export type TextInputFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  TextInputProps,
  "name" | "value" | "onChange" | "valueState" | "onBlur" | "maxlength"
> &
  Pick<
    FormFieldValidation<FormValues, string>,
    "required" | "minLength" | "maxLength" | "validate"
  > & {
    name: FormFieldName;
    dependsOn?:
      | string
      | string[]
      | FieldPath<FormValues>
      | FieldPath<FormValues>[];
    onChange?: (
      event: CustomEvent<FieldEventDetail<FormValues, FormFieldName>>
    ) => void;
    onSubmit?: (
      event: CustomEvent<FieldEventDetail<FormValues, FormFieldName>>
    ) => void;
  };

export const TextInputField = forwardRef<
  FormFieldElement,
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

    const actionsRef = useFieldActionRef(name);

    // store input ref for internal usage
    const inputRef = useRef<InputDomRef>(null);
    // forward outer ref to custom element
    useImperativeHandle(forwardedRef, () => ({
      // TODO provide more methods! -> validate, getValue, setValue
      focus() {
        if (inputRef.current != null) {
          inputRef.current.focus();
        }
      },
    }));
    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => inputRef.current);

    const dispatchChangeEvent = useCustomEventDispatcher<
      FieldEventDetail<any, any>
    >({
      ref: inputRef,
      name: "field-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      FieldEventDetail<any, any>
    >({
      ref: inputRef,
      name: "field-submit",
      onEvent: onSubmit,
    });

    return (
      <BusyIndicator active={field.busy} delay={0}>
        <TextInput
          {...props}
          readonly={props.readonly || field.busy}
          ref={inputRef}
          name={field.name}
          // use empty string to reset value, undefined will be ignored by web component
          value={field.value === undefined ? "" : field.value}
          onInput={useEventCallback((event) => {
            // reset previous errors
            field.error && actionsRef.current.clearError();
            onInput?.(event);
          })}
          onChange={useEventCallback(async (event) => {
            actionsRef.current.setValue(event.target.value);

            const value = actionsRef.current.getValue();
            const valid = await actionsRef.current.validate();

            dispatchChangeEvent({
              name,
              value,
              valid,
              formApi: actionsRef.current,
            });
          })}
          onSubmit={useEventCallback(async (event) => {
            const value = actionsRef.current.getValue();
            const valid = await actionsRef.current.validate();

            dispatchSubmitEvent({
              name,
              value,
              valid,
              formApi: actionsRef.current,
            });
          })}
          valueState={field.valueState}
          valueStateMessage={
            field.valueStateMessage != null && (
              <div slot="valueStateMessage">{field.valueStateMessage}</div>
            )
          }
          required={required}
          maxlength={
            maxLength != null
              ? typeof maxLength === "number"
                ? maxLength
                : maxLength.value
              : undefined
          }
        />
      </BusyIndicator>
    );
  }
) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  p: TextInputFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldElement | undefined>;
  }
) => ReactElement;
