import { Input, InputDomRef, InputPropTypes } from "@ui5/webcomponents-react";
import {
  HTMLAttributes,
  KeyboardEvent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { GlobalHtmlKeyInputElementProps } from "./GlobalHtmlElementProps";
import { triggerSubmitOnEnter } from "./util";

// pick only those props which we do care about
type TextInputHtmlProps = Pick<HTMLAttributes<HTMLElement>, "onKeyPress">;

export type TextInputProps = GlobalHtmlKeyInputElementProps<InputDomRef> &
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
export const TextInput = forwardRef<InputDomRef | null, TextInputProps>(
  ({ value, ...props }, forwardedRef) => {
    return <Input {...props} ref={forwardedRef} value={value} />;
  }
);
