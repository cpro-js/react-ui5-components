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

import {
  CreatableSelect,
  CreatableSelectProps,
} from "../../component/autocomplete/CreatableSelect";
import { DefaultAutoCompleteOption } from "../../component/AutoCompleteModel";
import { useControlledField } from "../../form/useField";
import { useCustomEventDispatcher } from "../../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldElement,
  FormFieldValidation,
} from "../types";

export type CreatableSelectFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  T extends {} = DefaultAutoCompleteOption
> = Omit<
  CreatableSelectProps<T>,
  | "name"
  | "value"
  | "inputValue"
  | "valueState"
  | "valueStateMessage"
  | "onChange"
  | "onSelectionChange"
> &
  Pick<FormFieldValidation<FormValues, string>, "required" | "validate"> &
  FormFieldCommonProps<FormValues, FormFieldName> & {
    onChange?: (
      event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    ) => void;
  };

export const CreatableSelectField = forwardRef<
  FormFieldElement<any, any>,
  CreatableSelectFieldProps<any, any>
>(
  (
    { name, required, validate, dependsOn, onKeyDown, onChange, ...props },
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

    return (
      <CreatableSelect
        {...props}
        ref={elementRef}
        name={field.name}
        value={field.value}
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
        onValueChange={useEventCallback(async (value) => {
          field.fieldApiRef.current.setValue(value);
          const valid = await field.fieldApiRef.current.validate();

          dispatchChangeEvent({
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
  FormFieldName extends FieldPath<FormValues>,
  T extends {} = DefaultAutoCompleteOption
>(
  p: CreatableSelectFieldProps<FormValues, FormFieldName, T> & {
    ref?: Ref<FormFieldElement<FormValues, FormFieldName>>;
  }
) => ReactElement;
