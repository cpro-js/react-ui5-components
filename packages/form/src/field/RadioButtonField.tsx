import { RadioButtonDomRef } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath, FieldPathValue, FieldValues } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { RadioButton, RadioButtonProps } from "../component/RadioButton";
import { useControlledField } from "../form/_internal/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import { RadioButtonFieldGroupContext } from "./RadioButtonFieldGroup";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldRef,
  FormFieldValidation,
} from "./types";

export const MISSING_NAME = "CHECKBOX_NAME_IS_MISSING";

export type RadioButtonFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<RadioButtonProps, "name" | "checked" | "onChange" | "valueState"> &
  Pick<
    FormFieldValidation<FormValues, FieldPathValue<FormValues, FormFieldName>>,
    "required" | "validate"
  > &
  Partial<FormFieldCommonProps<FormValues, FormFieldName>> & {
    /**
     * Name is optional within RadioButtonFieldGroup
     */
    name?: string;
    onChange?: (
      event: FormFieldChangeEvent<RadioButtonDomRef, FormValues, FormFieldName>
    ) => void;
  };

/** `RadioButtonField` as wrapper of `RadioButton` to be used in a form*/
export const RadioButtonField = forwardRef<
  FormFieldRef<any, any>,
  RadioButtonFieldProps<any, any>
>((props, forwardedRef) => {
  const groupProps = useContext(RadioButtonFieldGroupContext);

  const {
    name = groupProps?.name ?? MISSING_NAME,
    value,
    required = groupProps?.required,
    validate,
    dependsOn,
    onChange,
    onBlur,
    ...otherProps
  } = props;

  // store input ref for internal usage
  const elementRef = useRef<RadioButtonDomRef>(null);

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
    RadioButtonDomRef,
    FieldEventDetail<any, any>
  >({
    ref: elementRef,
    name: "field-change",
    onEvent: onChange,
  });

  return (
    <RadioButton
      {...groupProps}
      {...otherProps}
      ref={elementRef}
      name={field.name}
      value={value}
      checked={field.value === value}
      readonly={props.readonly || field.isValidating || field.isSubmitting}
      required={required}
      valueState={field.valueState}
      onChange={useEventCallback(async (event) => {
        // don't bubble up this event -> we trigger our own enhanced event
        event.stopPropagation();

        const updatedValue: any = event.target.checked
          ? event.target.value
          : undefined;

        field.fieldApiRef.current.setValue(updatedValue);
        const valid = await field.fieldApiRef.current.validate();

        dispatchChangeEvent({
          name,
          value: updatedValue,
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
}) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  p: RadioButtonFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
