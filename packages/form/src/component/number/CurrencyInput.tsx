import { InputDomRef } from "@ui5/webcomponents-react";
import { forwardRef, useContext } from "react";

import { SharedHtmlPropsWithKeyInput } from "../SharedHtmlProps";
import { BaseNumberInput } from "./BaseNumberInput";
import { NumberContext } from "./context/NumberContext";
import type {
  CommonNumberInputProps,
  NumberDisplayConfig,
  NumberInputConfig,
} from "./NumberModel";

export type CurrencyInputProps = SharedHtmlPropsWithKeyInput<InputDomRef> &
  NumberDisplayConfig &
  NumberInputConfig &
  Pick<
    CommonNumberInputProps,
    | "value"
    | "onChange"
    | "onValue"
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
  > & {
    /**
     * Three letter ISO code of currency, e.g. EUR or USD
     */
    currency?: string;
    showCurrency?: boolean;
  };

/** `CurrencyInput` as a wrapper around
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-basenumberinput--docs" target="_blank">UI5 BaseNumberInput</a>
 */
export const CurrencyInput = forwardRef<InputDomRef, CurrencyInputProps>(
  (props, forwardedRef) => {
    const {
      currency: explicitCurrency,
      showCurrency,
      style = {},
      ...passThrough
    } = props;

    const numberContext = useContext(NumberContext);
    const currency = explicitCurrency || numberContext.currency;

    if (!currency) {
      throw Error("Currency must be provided to CurrencyInput!");
    }

    const isShowCurrency = props.hasOwnProperty("showCurrency")
      ? showCurrency
      : numberContext.hasOwnProperty("showCurrency")
      ? numberContext.showCurrency
      : true;

    return (
      <BaseNumberInput
        icon={isShowCurrency ? <span>{currency}</span> : undefined}
        {...numberContext}
        {...passThrough}
        currency={currency}
        style={{ textAlign: "right", ...style }}
        ref={forwardedRef}
      />
    );
  }
);
