import { FC, useContext, useMemo } from "react";

import { BaseNumberInput, CommonNumberInputProps } from "./BaseNumberInput";
import { NumberContext } from "./context/NumberContext";
import { NumberDisplayConfig, NumberInputConfig } from "./NumberInput";

export interface CurrencyInputProps extends CommonNumberInputProps {
  /**
   * Three letter ISO code of currency, e.g. EUR or USD
   */
  currency?: string;
  displayConfig?: NumberDisplayConfig;
  inputConfig?: NumberInputConfig;
}

export const CurrencyInput: FC<CurrencyInputProps> = (props) => {
  const {
    currency: explicitCurrency,
    style = {},
    displayConfig,
    inputConfig,
    ...passThrough
  } = props;

  const providedCurrency = useContext(NumberContext);
  const currency = explicitCurrency || providedCurrency.currency;
  if (!currency) {
    throw Error("Currency must be provided ot CurrencyInput!");
  }

  const displayFormatter: Intl.NumberFormatOptions = useMemo(
    () => ({ ...displayConfig, style: "currency", currency }),
    [displayConfig]
  );

  const inputFormatter: Intl.NumberFormatOptions = useMemo(
    () => ({ ...inputConfig, style: "currency", currency }),
    [inputConfig]
  );

  return (
    <BaseNumberInput
      icon={currency ? <span>{currency}</span> : undefined}
      {...passThrough}
      displayConfig={displayFormatter}
      inputConfig={inputFormatter}
      style={{ textAlign: "right", ...style }}
    />
  );
};
