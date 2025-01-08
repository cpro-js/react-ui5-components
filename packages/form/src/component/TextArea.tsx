import { TextArea as UI5TextArea } from "@ui5/webcomponents-react";
import { TextAreaDomRef, TextAreaPropTypes } from "@ui5/webcomponents-react";
import { forwardRef } from "react";

import { SharedHtmlProps } from "./SharedHtmlProps";

export type TextAreaProps = SharedHtmlProps &
  Pick<
    TextAreaPropTypes,
    | "valueStateMessage"
    | "onChange"
    | "onInput"
    | "disabled"
    | "growing"
    | "growingMaxRows"
    | "maxlength"
    | "name"
    | "placeholder"
    | "readonly"
    | "required"
    | "rows"
    | "showExceededText"
    | "value"
    | "valueState"
  >;

//export interface TextAreaProps extends TextAreaPropTypes {}

/** `TextArea` as a wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-textarea--docs" target="_blank">UI5 TextArea</a>
 */
export const TextArea = forwardRef<TextAreaDomRef, TextAreaProps>(
  ({ ...props }, forwardedRef) => {
    return <UI5TextArea {...props} ref={forwardedRef} />;
  }
);
