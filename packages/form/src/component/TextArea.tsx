import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { TextArea } from "@ui5/webcomponents-react";
import { TextAreaPropTypes } from "@ui5/webcomponents-react/webComponents/TextArea";
import { FC, KeyboardEvent, forwardRef, useCallback } from "react";

import { triggerSubmitOnEnter } from "./util";

export interface TextAreaProps extends TextAreaPropTypes {}

export const TextAreaField: FC<TextAreaProps> = forwardRef<
  HTMLInputElement | undefined,
  TextAreaProps
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

  return <TextArea {...props} ref={forwardedRef} onKeyPress={handleKeyPress} />;
});

export default TextArea;
