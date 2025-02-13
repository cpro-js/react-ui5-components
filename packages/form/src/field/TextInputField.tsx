import { useDebounce, useDebounceCallback } from "@react-hook/debounce";
import { BusyIndicator, InputDomRef } from "@ui5/webcomponents-react";
import {
  KeyboardEventHandler,
  ReactElement,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import { TextInput, TextInputProps } from "../component/TextInput";
import {
  FieldActions,
  useControlledField,
  useCustomEvent,
  useFieldActionRef,
} from "../form/useField";
import {
  ChangedField,
  FormFieldElement,
  FormFieldValidation,
  PartialFormValues,
} from "./types";

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
      onKeyUp,
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
    });

    const actionsRef = useFieldActionRef(name);
    const pressedEnterPreviously = useRef<boolean>(false);
    const firedSubmitByChange = useRef<boolean>(false);

    // store input ref for intenral usage
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

    const dispatchChangeEvent = useCustomEvent<FieldEventDetail<any, any>>({
      ref: inputRef,
      name: "field-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEvent<FieldEventDetail<any, any>>({
      ref: inputRef,
      name: "field-submit",
      onEvent: onSubmit,
    });

    const handleKeyUp: KeyboardEventHandler<InputDomRef> = useEventCallback(
      async (event) => {
        onKeyUp?.(event);
        if (
          !event.isDefaultPrevented() &&
          pressedEnterPreviously.current &&
          !firedSubmitByChange.current
        ) {
          // user just pressed enter again (value didn't change) -> validate again!
          const value = actionsRef.current.getValue();
          const valid = await actionsRef.current.validate();

          dispatchSubmitEvent({
            name,
            valid,
            value,
            formApi: actionsRef.current,
          });
        }
      }
    );

    const { watch, getFieldState } = useFormContext();

    const revalidateIfDiry = useEventCallback(
      useDebounceCallback(
        () => {
          if (getFieldState(name).isTouched) {
            console.log("revalidate", name);
            // values changed -> revalidate
            void actionsRef.current.validate();
          }
        },
        10,
        false
      )
    );

    // dependsOn
    useEffect(() => {
      if (!dependsOn || dependsOn.length === 0) {
        return;
      }

      const { unsubscribe } = watch((_, { name }) => {
        if (name && dependsOn.includes(name)) {
          // values changed -> revalidate
          revalidateIfDiry();
        }
      });

      return () => unsubscribe();
    }, [dependsOn, revalidateIfDiry]);

    return (
      <BusyIndicator active={field.busy} delay={0}>
        <TextInput
          {...props}
          ref={inputRef}
          name={field.name}
          // use empty string to reset value, undefined will be ignored by web component
          value={field.value === undefined ? "" : field.value}
          onInput={() => {
            // reset any previous errors
            getFieldState(name).error && actionsRef.current.clearError();
          }}
          onFocus={() => {
            pressedEnterPreviously.current = false;
            firedSubmitByChange.current = false;
          }}
          onChange={async (event) => {
            await new Promise((r) => setTimeout(r, 0));

            actionsRef.current.setValue(event.target.value);

            const fireSubmit = (firedSubmitByChange.current =
              pressedEnterPreviously.current);

            const value = actionsRef.current.getValue();
            const valid = await actionsRef.current.validate();

            dispatchChangeEvent({
              name,
              value,
              valid,
              formApi: actionsRef.current,
            });

            if (fireSubmit) {
              // just delay it a bit
              setTimeout(() => {
                dispatchSubmitEvent({
                  name,
                  value,
                  valid,
                  formApi: actionsRef.current,
                });
              }, 0);
            }
          }}
          onKeyDown={(event) => {
            pressedEnterPreviously.current =
              event.key == "Enter" || event.keyCode === 13;
            firedSubmitByChange.current = false;
          }}
          onKeyUp={handleKeyUp}
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
