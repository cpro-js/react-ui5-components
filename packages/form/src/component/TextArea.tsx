import "../form/formSupport";

import { TextArea as UI5TextArea } from "@ui5/webcomponents-react";
import { TextAreaDomRef, TextAreaPropTypes } from "@ui5/webcomponents-react";
import { HTMLAttributes, forwardRef } from "react";

// pick only those props which we do care about
type SharedHtmlProps = Pick<
  HTMLAttributes<HTMLElement>,
  | "style"
  | "className"
  | "id"
  | "placeholder"
  | "title"
  | "onKeyUp"
  | "onKeyDown"
  | "onBlur"
  | "onFocus"
  | "onPaste"
  | "onMouseOver"
  | "onMouseOut"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
>;

export type TextAreaProps = SharedHtmlProps &
  Pick<
    TextAreaPropTypes,
    | "valueStateMessage"
    | "onChange"
    | "onInput"
    | "disabled"
    | "growing"
    | "growingMaxLines"
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
