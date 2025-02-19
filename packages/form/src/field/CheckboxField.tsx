import { CheckBoxDomRef, InputDomRef } from "@ui5/webcomponents-react";
import {
  ChangeEvent,
  ReactElement,
  Ref,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { CheckBoxProps, Checkbox } from "../component/Checkbox";
import { useControlledField } from "../form/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import { CheckboxFieldGroupContext } from "./CheckboxFieldGroup";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldRef,
  FormFieldValidation,
} from "./types";

export const MISSING_NAME = "CHECKBOX_NAME_IS_MISSING";

export type CheckboxFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>
> = Omit<
  CheckBoxProps,
  | "name"
  | "checked"
  | "defaultChecked"
  | "defaultValue"
  | "onChange"
  | "valueState"
> &
  Pick<
    FormFieldValidation<FormValues, FieldPathValue<FormValues, FormFieldName>>,
    "required" | "validate"
  > &
  Partial<FormFieldCommonProps<FormValues, FormFieldName>> & {
    /**
     * Name is optional within CheckboxFieldGroup
     */
    name?: string;
    /**
     * Optional parameter. If set to true, checkbox will use true/false instead of value.
     */
    boolean?: boolean;

    onChange?: (
      event: FormFieldChangeEvent<CheckBoxDomRef, FormValues, FormFieldName>
    ) => void;
  };

/** `CheckboxField` as wrapper of `Checkbox` to be used in a form*/
export const CheckboxField = forwardRef<
  FormFieldRef<any, any>,
  CheckboxFieldProps<any, any>
>((props, forwardedRef) => {
  const checkboxGroupProps = useContext(CheckboxFieldGroupContext);

  const {
    name = checkboxGroupProps?.name != null
      ? checkboxGroupProps.name
      : MISSING_NAME,
    value = "on",
    boolean,
    required = checkboxGroupProps?.required,
    validate,
    dependsOn,
    onChange,
    onBlur,
    ...otherProps
  } = props;

  const isMultiValue = checkboxGroupProps != null;

  const field = useControlledField({
    name,
    required,
    validate,
    dependsOn,
  });

  // support imperative form field api via ref
  useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

  // store input ref for internal usage
  const elementRef = useRef<CheckBoxDomRef>(null);

  // forward field ref to stored internal input ref
  useImperativeHandle(field.ref, () => elementRef.current);

  const dispatchChangeEvent = useCustomEventDispatcher<
    CheckBoxDomRef,
    FieldEventDetail<any, any>
  >({
    ref: elementRef,
    name: "field-change",
    onEvent: onChange,
  });

  const checked = isMultiValue
    ? !Array.isArray(field.value)
      ? false
      : (field.value as Array<string>).indexOf(value) !== -1
    : boolean
    ? field.value
    : field.value === value;

  return (
    <Checkbox
      {...checkboxGroupProps}
      {...otherProps}
      ref={elementRef}
      name={field.name}
      value={value}
      checked={checked}
      readonly={props.readonly || field.isValidating || field.isSubmitting}
      required={required}
      valueState={field.valueState}
      onChange={useEventCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
          // don't bubble up this event -> we trigger our own enhanced event
          event.stopPropagation();

          let updatedValue: any = event.target.checked
            ? event.target.value
            : undefined;

          if (isMultiValue) {
            const actualValues = field.fieldApiRef.current.getValue();
            updatedValue = (Array.isArray(actualValues) ? actualValues : [])
              .filter((v) => event.target.value !== v)
              .concat(event.target.checked ? [event.target.value] : []);
          } else if (boolean) {
            updatedValue = event.target.checked;
          }
          field.fieldApiRef.current.setValue(updatedValue);
          const valid = await field.fieldApiRef.current.validate();

          dispatchChangeEvent({
            name,
            value: updatedValue,
            valid,
            field: field.fieldApiRef.current,
            form: field.formApiRef.current,
          });
        }
      )}
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
  p: CheckboxFieldProps<FormValues, FormFieldName> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
