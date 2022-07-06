import "../form/formSupport";

import { Input } from "@ui5/webcomponents-react";
import { InputDomRef, InputPropTypes } from "@ui5/webcomponents-react";
import {
  FC,
  KeyboardEvent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { triggerSubmitOnEnter, useOnChangeWorkaround } from "./util";

export interface TextInputProps extends InputPropTypes {}

export const TextInput: FC<TextInputProps> = forwardRef<
  InputDomRef,
  TextInputProps
>(({ value, onKeyPress, ...props }, forwardedRef) => {
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
});
