import { InputDomRef } from "@ui5/webcomponents-react";
import { forwardRef, useContext } from "react";

import { GlobalHtmlKeyInputElementProps } from "../GlobalHtmlElementProps";
import { BaseNumberInput } from "./BaseNumberInput";
import { NumberContext } from "./context/NumberContext";
import type {
  CommonNumberInputProps,
  NumberDisplayConfig,
  NumberInputConfig,
} from "./NumberModel";

export type NumberInputProps = Omit<
  GlobalHtmlKeyInputElementProps<InputDomRef>,
  "onKeyUp"
> &
  NumberDisplayConfig &
  NumberInputConfig &
  Pick<
    CommonNumberInputProps,
    | "value"
    | "onChange"
    | "onSubmit"
    | "onInput"
    | "onKeyUp"
    | "locale"
    | "showNumberWarningMessages"
    | "getNumberWarningMessage"
    | "children"
    | "icon"
    | "valueStateMessage"
    | "disabled"
    | "name"
    | "noTypeahead"
    | "placeholder"
    | "readonly"
    | "required"
    | "showClearIcon"
    | "valueState"
  >;

/** `NumberInput` as a wrapper for
 *  <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-input--docs" target="_blank">Ui5 Input</a>
 *  modified to only accept numbers */
export const NumberInput = forwardRef<InputDomRef, NumberInputProps>(
  (props, forwardedRef) => {
    // extract currency specific fields from context
    const { currency, showCurrency, ...contextProps } =
      useContext(NumberContext);

    return <BaseNumberInput {...contextProps} {...props} ref={forwardedRef} />;
  }
);
