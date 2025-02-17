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
import { useControlledField } from "../form/useField";
import { useCustomEventDispatcher } from "../hook/useCustomEventDispatcher";
import {
  FieldEventDetail,
  FormFieldChangeEvent,
  FormFieldCommonProps,
  FormFieldElement,
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
export const MultiAutoCompleteField = forwardRef<
  FormFieldElement<any, any>,
  MultiAutoCompleteFieldProps<any, any>
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
    const elementRef =
      useRef<MultiAutoComplete<DefaultAutoCompleteOption>>(null);

    const internalElementRef = useRef<MultiInputDomRef>(null);

    useImperativeHandle(internalElementRef, () => {
      return elementRef.current!.inputRef.current!;
    });

    // forward field ref to stored internal input ref
    useImperativeHandle(field.ref, () => elementRef.current);

    const dispatchChangeEvent = useCustomEventDispatcher<
      FieldEventDetail<any, any>
    >({
      ref: internalElementRef,
      name: "field-change",
      onEvent: onChange as unknown as (
        event: CustomEvent<FieldEventDetail<any, any>>
      ) => void,
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
        onChange={useEventCallback(async (_, value) => {
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
  T = DefaultAutoCompleteOption
>(
  p: MultiAutoCompleteFieldProps<FormValues, FormFieldName, T> & {
    ref?: Ref<FormFieldElement<FormValues, FormFieldName>>;
  }
) => ReactElement;
