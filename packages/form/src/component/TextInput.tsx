import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { Input } from "@ui5/webcomponents-react";
import {
  InputDomRef,
  InputPropTypes,
} from "@ui5/webcomponents-react/webComponents/Input";
import { FC, KeyboardEvent, forwardRef, useCallback } from "react";

import { triggerSubmitOnEnter } from "./util";

export interface TextInputProps extends InputPropTypes {}

export const TextInput: FC<TextInputProps> = forwardRef<
  InputDomRef,
  TextInputProps
>(({ onKeyPress, ...props }, forwardedRef) => {
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

  return <Input {...props} ref={forwardedRef} onKeyPress={handleKeyPress} />;
});
