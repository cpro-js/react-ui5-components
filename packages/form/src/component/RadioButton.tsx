import {
  RadioButtonDomRef,
  RadioButtonPropTypes,
  RadioButton as UI5RadioButton,
} from "@ui5/webcomponents-react";
import { forwardRef } from "react";

import { GlobalHtmlElementProps } from "./GlobalHtmlElementProps";

export type RadioButtonProps = GlobalHtmlElementProps<RadioButtonDomRef> &
  Pick<
    RadioButtonPropTypes,
    | "checked"
    | "disabled"
    | "name"
    | "value"
    | "readonly"
    | "required"
    | "text"
    | "valueState"
    | "wrappingType"
    | "onChange"
  >;

/**
 * `RadioButton` wrapper to enhance types of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-radiobutton--docs" target="_blank">UI5 RadioButton</a>
 */
export const RadioButton = forwardRef<RadioButtonDomRef, RadioButtonProps>(
  (props, forwardedRef) => {
    return <UI5RadioButton {...props} ref={forwardedRef} />;
  }
);
