import { DateTimePickerDomRef } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useContext,
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
  DateTimePicker,
  DateTimePickerProps,
} from "../component/DateTimePicker";
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

const convertToDateOnly = (
  value: Date | any,
  parse: (value: any) => Date | null
): Date | null => {
  const temp = value instanceof Date ? value : parse(value);
  if (temp != null) {
    return new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
  }

  return null;
};

const isErrorIgnored = (error: FieldError | undefined) =>
  // minDate and maxDate errors are already handled by web component -> no need to provide our own error message
  error != null && (error.type === "minDate" || error.type === "maxDate");

export type DateTimePickerFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  DateTimePickerProps,
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
      event: FormFieldChangeEvent<
        DateTimePickerDomRef,
        FormValues,
        FormFieldName
      >
    ) => void;
    onSubmit?: (
      event: FormFieldSubmitEvent<
        DateTimePickerDomRef,
        FormValues,
        FormFieldName
      >
    ) => void;
  };

export const DateTimePickerField = forwardRef<
  FormFieldRef<any, any>,
  DateTimePickerFieldProps<any, any>
>(
  (
    {
      name,
      required,
      minDate,
      maxDate,
      validate,
      dependsOn,
      onInput,
      onChange,
      onSubmit,
      onBlur,
      ...props
    },
    forwardedRef
  ) => {
    const {
      dateTime: { parse },
    } = useContext(FormAdapterContext);

    const field = useControlledField({
      name,
      required,
      validate: {
        ...(typeof validate === "function" ? { validate: validate } : validate),
        ...(minDate == null
          ? {}
          : {
              minDate: (value?: Date | string | null) => {
                if (value == null) {
                  return true;
                }
                const normalizedValue = convertToDateOnly(value, parse);
                const normalizedMinDate = convertToDateOnly(minDate, parse);

                return (
                  normalizedValue == null ||
                  normalizedMinDate == null ||
                  normalizedValue >= normalizedMinDate
                );
              },
            }),
        ...(maxDate == null
          ? {}
          : {
              maxDate: (value?: Date | string | null) => {
                if (value == null) {
                  return true;
                }
                const normalizedValue = convertToDateOnly(value, parse);
                const normalizedMaxDate = convertToDateOnly(maxDate, parse);

                return (
                  normalizedValue == null ||
                  normalizedMaxDate == null ||
                  normalizedValue <= normalizedMaxDate
                );
              },
            }),
      },
      dependsOn,
    });

    // support imperative form field api via ref
    useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

    // store input ref for internal usage
    const elementRef = useRef<DateTimePickerDomRef>(null);

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current);

    const dispatchChangeEvent = useCustomEventDispatcher<
      DateTimePickerDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      DateTimePickerDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-submit",
      onEvent: onSubmit,
    });

    return (
      <DateTimePicker
        {...props}
        ref={elementRef}
        name={field.name}
        // use null to reset value, undefined will be ignored by web component
        value={field.value === undefined ? null : field.value}
        readonly={props.readonly || field.isValidating || field.isSubmitting}
        required={required}
        minDate={minDate}
        maxDate={maxDate}
        valueState={field.valueState}
        // ignore custom message for minDate and maxDate because they are already handled by minDate / maxDate
        valueStateMessage={
          !isErrorIgnored(field.error) &&
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
  FormFieldName extends FieldPath<FormValues>
>(
  p: DateTimePickerFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
