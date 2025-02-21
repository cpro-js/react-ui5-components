import {
  MultiComboBoxDomRef,
  MultiInputDomRef,
} from "@ui5/webcomponents-react";
import {
  ReactElement,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { DefaultAutoCompleteOption } from "../component/AutoCompleteModel";
import {
  MultiAutoComplete,
  MultiAutoCompleteProps,
} from "../component/MultiAutoComplete";
import { useControlledField } from "../form/_internal/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldRef,
  FormFieldValidation,
} from "./types";

export type MultiAutoCompleteFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  T = DefaultAutoCompleteOption
> = Omit<
  MultiAutoCompleteProps<T>,
  | "name"
  | "values"
  | "valueState"
  | "valueStateMessage"
  | "onSelectionChange"
  | "onChange"
> &
  Pick<
    FormFieldValidation<FormValues, Array<string | number>>,
    "required" | "validate"
  > &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<MultiInputDomRef, FormValues, FormFieldName>
    ) => void;
    // onSubmit?: (
    //   event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    // ) => void;
  };
export const MultiAutoCompleteField = forwardRef<
  FormFieldRef<any, any>,
  MultiAutoCompleteFieldProps<any, any>
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
    const field = useControlledField({
      name,
      required,
      validate,
      dependsOn,
    });
    // support imperative form field api via ref
    useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

    // store input ref for internal usage
    const elementRef =
      useRef<MultiAutoComplete<DefaultAutoCompleteOption>>(null);

    const internalElementRef = useRef<MultiInputDomRef>(null);

    useImperativeHandle(internalElementRef, () => {
      return elementRef.current!.inputRef.current!;
    });

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current);

    const dispatchChangeEvent = useCustomEventDispatcher<
      MultiInputDomRef,
      FieldEventDetail<any, any>
    >({
      ref: internalElementRef,
      name: "field-change",
      onEvent: onChange,
    });

    return (
      <MultiAutoComplete
        {...props}
        ref={elementRef}
        name={field.name}
        values={field.value}
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
  T = DefaultAutoCompleteOption
>(
  p: MultiAutoCompleteFieldProps<FormValues, FormFieldName, T> & {
    ref?: Ref<FormFieldRef<FormValues, FormFieldName>>;
  }
) => ReactElement;
