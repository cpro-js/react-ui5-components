import { TimePickerDomRef } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  FieldError,
  FieldPath,
  FieldPathValue,
  FieldValues,
} from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import {
  TimePicker,
  TimePickerProps,
  durationToTime,
  normalizeTimeValue,
} from "../component/TimePicker";
import { useControlledField } from "../form/_internal/useField";
import { FormAdapterContext } from "../form/FormAdapter";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldRef,
  FormFieldSubmitEvent,
  FormFieldValidation,
} from "./types";

const isErrorIgnored = (error: FieldError | undefined) =>
  error != null && error.type === "pattern";

export type TimePickerFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  TimePickerProps,
  | "name"
  | "value"
  | "valueState"
  | "valueStateMessage"
  | "onChange"
  | "onSubmit"
> &
  Pick<
    FormFieldValidation<FormValues, FieldPathValue<FormValues, FormFieldName>>,
    "required" | "validate"
  > &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<TimePickerDomRef, FormValues, FormFieldName>
    ) => void;
    onSubmit?: (
      event: FormFieldSubmitEvent<TimePickerDomRef, FormValues, FormFieldName>
    ) => void;
  };

export const TimePickerField = forwardRef<
  FormFieldRef<any, any>,
  TimePickerFieldProps<any, any>
>((props, forwardedRef) => {
  const {
    name,
    required,
    validate,
    dependsOn,
    onChange,
    onSubmit,
    onBlur,
    ...timePickerProps
  } = props;

  const elementRef = useRef<TimePickerDomRef>(null);

  const field = useControlledField({
    ref: elementRef,
    name,
    required,
    validate,
    dependsOn,
  });

  useImperativeHandle(forwardedRef, () => field.fieldApiRef.current, [
    field.fieldApiRef,
  ]);

  useImperativeHandle(field.ref, () => elementRef.current, []);

  const dispatchChangeEvent = useCustomEventDispatcher<
    TimePickerDomRef,
    FieldEventDetail<any, any>
  >({
    ref: elementRef,
    name: "field-change",
    onEvent: onChange,
  });

  const dispatchSubmitEvent = useCustomEventDispatcher<
    TimePickerDomRef,
    FieldEventDetail<any, any>
  >({
    ref: elementRef,
    name: "field-submit",
    onEvent: onSubmit,
  });

  const formattedValue =
    field.value != null
      ? normalizeTimeValue(
          durationToTime(field.value, timePickerProps.formatPattern ?? "HH:mm"),
          timePickerProps.formatPattern ?? "HH:mm"
        )
      : undefined;

  useEffect(() => {
    if (field.value != null && field.value.split(":").length < 3) {
      const normalized = normalizeTimeValue(
        durationToTime(field.value, timePickerProps.formatPattern ?? "HH:mm"),
        timePickerProps.formatPattern ?? "HH:mm"
      );
      field.fieldApiRef.current.setValue(normalized);
    }
  }, [field.value, timePickerProps.formatPattern]);

  return (
    <TimePicker
      {...timePickerProps}
      ref={elementRef}
      name={field.name}
      value={formattedValue}
      readonly={props.readonly || field.isValidating || field.isSubmitting}
      required={required}
      valueState={field.valueState}
      valueStateMessage={
        !isErrorIgnored(field.error) &&
        field.valueStateMessage != null && (
          <div slot="valueStateMessage">{field.valueStateMessage}</div>
        )
      }
      onChange={useEventCallback(async (event) => {
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
}) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  p: TimePickerFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
