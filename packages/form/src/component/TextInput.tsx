import "../form/formSupport";

import { Input } from "@ui5/webcomponents-react";
import { InputDomRef, InputPropTypes } from "@ui5/webcomponents-react";
import {
  KeyboardEvent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { triggerSubmitOnEnter, useOnChangeWorkaround } from "./util";

export interface TextInputProps extends InputPropTypes {}

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

    const { inputMode } = props;

    useEffect(() => {
      const input = inputRef.current?.shadowRoot?.querySelector("input") as
        | HTMLInputElement
        | undefined;
      if (input) {
        if (inputMode) {
          input.setAttribute("inputmode", inputMode);
        } else {
          input.removeAttribute("inputmode");
        }
      }
    }, [inputMode]);

    return (
      <Input
        {...props}
        inputMode={inputMode}
        ref={inputRef}
        onKeyPress={handleKeyPress}
        value={value}
      />
    );
  }
);
