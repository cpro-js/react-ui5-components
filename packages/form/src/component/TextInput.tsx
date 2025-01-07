import { Input } from "@ui5/webcomponents-react";
import { InputDomRef, InputPropTypes } from "@ui5/webcomponents-react";
import {
  FC,
  HTMLAttributes,
  KeyboardEvent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { SharedHtmlProps } from "./SharedHtmlProps";
import { triggerSubmitOnEnter, useOnChangeWorkaround } from "./util";

// pick only those props which we do care about
type TextInputHtmlProps = Pick<HTMLAttributes<HTMLElement>, "onKeyPress">;

export type TextInputProps = SharedHtmlProps &
  TextInputHtmlProps &
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
  >;

/** `TextInput` as a wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-input--docs" target="_blank">UI5 Input</a>
 * adding a custom `SubmitOnEnter` eventhandler, which triggers when pressing enter.
 */
export const TextInput = forwardRef<InputDomRef, TextInputProps>(
  ({ value, onKeyPress, ...props }, forwardedRef) => {
    const handleKeyPress = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        // Workaround: Webcomponents catches enter -> need to submit manually
        // see https://github.com/SAP/ui5-webcomponents/pull/2855/files
        triggerSubmitOnEnter(event);
        if (onKeyPress != null) {
          onKeyPress(event);
        }
      },
      [onKeyPress]
    );

    // store input ref for internal usage
    const inputRef = useRef<InputDomRef>() as MutableRefObject<InputDomRef>;
    useImperativeHandle(forwardedRef, () => inputRef.current);
    // apply workaround to fix onChange event
    useOnChangeWorkaround(inputRef, value);

    return (
      <Input
        {...props}
        ref={inputRef}
        onKeyPress={handleKeyPress}
        value={value}
      />
    );
  }
);
