import { InputDomRef } from "@ui5/webcomponents-react/webComponents/Input";
import { FC, forwardRef, useContext } from "react";

import { BaseNumberInput } from "./BaseNumberInput";
import { NumberContext } from "./context/NumberContext";
import type {
  CommonNumberInputProps,
  NumberDisplayConfig,
  NumberInputConfig,
} from "./NumberModel";

export interface CurrencyInputProps
  extends CommonNumberInputProps,
    NumberDisplayConfig,
    NumberInputConfig {
  /**
   * Three letter ISO code of currency, e.g. EUR or USD
   */
  currency?: string;
  showCurrency?: boolean;
}

export const CurrencyInput: FC<CurrencyInputProps> = forwardRef<
  InputDomRef,
  CurrencyInputProps
>((props, forwardedRef) => {
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
});
