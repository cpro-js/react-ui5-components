import { TextAreaDomRef } from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { TextArea, TextAreaProps } from "../component/TextArea";
import { useControlledField } from "../form/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldElement,
  FormFieldValidation,
} from "./types";

export type TextAreaFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  TextAreaProps,
  | "name"
  | "value"
  | "maxlength"
  | "valueState"
  | "valueStateMessage"
  | "onChange"
> &
  Pick<
    FormFieldValidation<FormValues, string>,
    "required" | "minLength" | "maxLength" | "validate"
  > &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<TextAreaDomRef, FormValues, FormFieldName>
    ) => void;
  };

export const TextAreaField = forwardRef<
  FormFieldElement<any, any>,
  TextAreaFieldProps<any, any>
>(
  (
    {
      name,
      required,
      minLength,
      maxLength,
      validate,
      dependsOn,
      onChange,
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
    const elementRef = useRef<TextAreaDomRef>(null);

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current);

    const dispatchChangeEvent = useCustomEventDispatcher<
      TextAreaDomRef,
      FieldEventDetail<any, any>
    >({
      ref: elementRef,
      name: "field-change",
      onEvent: onChange,
    });

    return (
      <TextArea
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
        onChange={useEventCallback(async (event) => {
          // don't bubble up this event -> we trigger our own enhanced event
          event.stopPropagation();

          field.fieldApiRef.current.setValue(event.target.value);

          const value = field.fieldApiRef.current.getValue();
          const valid = await field.fieldApiRef.current.validate();

          dispatchChangeEvent({
            name,
            value,
            valid,
            field: field.fieldApiRef.current,
          });
        })}
        valueState={field.valueState}
        valueStateMessage={
          field.valueStateMessage != null && (
            <div slot="valueStateMessage">{field.valueStateMessage}</div>
          )
        }
      />
    );
  }
) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
>(
  p: TextAreaFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldElement<FormValues, FormFieldName>>;
  }
) => ReactElement;
