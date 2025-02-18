import {
  Input,
  InputDomRef,
  InputPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import {
  FocusEvent,
  KeyboardEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useEventCallback } from "usehooks-ts";

import {
  TypedCustomEvent,
  useCustomEventDispatcher,
} from "../hook/useCustomEventDispatcher";
import { GlobalHtmlKeyInputElementProps } from "./GlobalHtmlElementProps";
import { useFireSubmit } from "./util";

export type TextInputProps = GlobalHtmlKeyInputElementProps<InputDomRef> &
  Pick<
    InputPropTypes,
    | "children"
    | "icon"
    | "valueStateMessage"
    | "onChange"
    | "onSelectionChange"
    | "onInput"
    | "disabled"
    | "maxlength"
    | "name"
    | "noTypeahead"
    | "placeholder"
    | "required"
    | "readonly"
    | "showClearIcon"
    | "showSuggestions"
    | "type"
    | "value"
    | "valueState"
  > & {
    onSubmit?: (event: TypedCustomEvent<InputDomRef>) => void;
  };

/** `TextInput` as a wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-input--docs" target="_blank">UI5 Input</a>
 * adding a custom `SubmitOnEnter` eventhandler, which triggers when pressing enter.
 */
export const TextInput = forwardRef<InputDomRef | null, TextInputProps>(
  (
    { onFocus, onKeyDown, onKeyUp, onChange, onSubmit, ...props },
    forwardedRef
  ) => {
    // store internal input ref and pass it back
    const inputRef = useRef<InputDomRef>(null);
    useImperativeHandle(forwardedRef, () => inputRef.current!);

    const submit = useFireSubmit();

    const dispatchSubmitEvent = useCustomEventDispatcher<InputDomRef>({
      ref: inputRef,
      name: "cpro-submit",
      onEvent: onSubmit,
    });

    return (
      <Input
        {...props}
        ref={inputRef}
        onFocus={useEventCallback((e) => {
          submit.focus();
          onFocus?.(e as FocusEvent<InputDomRef>);
        })}
        onKeyDown={useEventCallback((e) => {
          submit.keyDown(e);
          onKeyDown?.(e as KeyboardEvent<InputDomRef>);
        })}
        onKeyUp={useEventCallback(async (event) => {
          onKeyUp?.(event as KeyboardEvent<InputDomRef>);
          if (submit.shouldFireSubmitOnKeyUp()) {
            // no change fired before -> user just pressed enter again -> trigger submit
            setTimeout(() => {
              dispatchSubmitEvent();
            }, 0);
          }
        })}
        onChange={useEventCallback(async (event) => {
          onChange?.(event);
          if (submit.shouldFireSubmitOnChange()) {
            // change event was triggered by enter --> submit
            setTimeout(() => {
              dispatchSubmitEvent();
            }, 0);
          }
        })}
      />
    );
  }
);
