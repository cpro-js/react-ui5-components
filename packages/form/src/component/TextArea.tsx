import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { TextArea as UI5TextArea } from "@ui5/webcomponents-react";
import { TextAreaPropTypes } from "@ui5/webcomponents-react/webComponents/TextArea";
import { FC, forwardRef } from "react";

export interface TextAreaProps extends TextAreaPropTypes {}

export const TextArea: FC<TextAreaProps> = forwardRef<
  HTMLInputElement | undefined,
  TextAreaProps
>(({ ...props }, forwardedRef) => {
  return <UI5TextArea {...props} ref={forwardedRef} />;
});
