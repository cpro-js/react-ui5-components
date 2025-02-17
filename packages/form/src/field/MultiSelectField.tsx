import { MultiComboBoxDomRef } from "@ui5/webcomponents-react";
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
  MultiSelect,
  MultiSelectItem,
  MultiSelectProps,
} from "../component/MultiSelect";
import { useControlledField } from "../form/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldElement,
  FormFieldValidation,
} from "./types";

export type MultiSelectFieldProps<
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  Item = MultiSelectItem,
  Value = string | number
> = Omit<
  MultiSelectProps<Item, Value>,
  | "name"
  | "value"
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
      event: FormFieldChangeEvent<
        MultiComboBoxDomRef,
        FormValues,
        FormFieldName
      >
    ) => void;
    // onSubmit?: (
    //   event: FormFieldChangeEvent<InputDomRef, FormValues, FormFieldName>
    // ) => void;
  };

export const MultiSelectField = forwardRef<
  FormFieldElement<any, any>,
  MultiSelectFieldProps<any, any>
>(
  (
    { name, required, validate, dependsOn, onChange, ...props },
    forwardedRef
  ) => {
    const field = useControlledField({
      name,
      required,
      // @ts-ignore TODO type mapping
      validate,
      dependsOn,
    });
    // support imperative form field api via ref
    useImperativeHandle(forwardedRef, () => field.fieldApiRef.current);

    // store input ref for internal usage
    const elementRef = useRef<MultiComboBoxDomRef>(null);

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
      <MultiSelect
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
        onSelectionChange={useEventCallback(async (_, value) => {
          field.fieldApiRef.current.setValue(value);
          const valid = await field.fieldApiRef.current.validate();

          dispatchChangeEvent({
            name,
            value,
            valid,
            fieldApi: field.fieldApiRef.current,
          });
        })}
        // onBlur={(event) => {
        //   // ignore blur event when combobox items are clicked
        //   if ((event.target as any).open && event.relatedTarget != null) {
        //     return;
        //   }
        //   field.onBlur();
        // }}
      />
    );
  }
) as <
  FormValues extends FieldValues,
  FormFieldName extends FieldPath<FormValues>,
  Item = MultiSelectItem,
  Value = string | number
>(
  p: MultiSelectFieldProps<FormValues, FormFieldName, Item, Value> & {
    ref?: Ref<FormFieldElement<FormValues, FormFieldName>>;
  }
) => ReactElement;
