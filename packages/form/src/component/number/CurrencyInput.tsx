import { FC, useMemo } from "react";

import { BaseNumberInput, CommonNumberInputProps } from "./BaseNumberInput";
import { NumberDisplayConfig, NumberInputConfig } from "./NumberInput";

export interface CurrencyInputProps extends CommonNumberInputProps {
  /**
   * Three letter ISO code of currency, e.g. EUR or USD
   *
   * When currency code is undefined, then no currency will be shown.
   */
  currency?: string;
  displayConfig?: NumberDisplayConfig;
  inputConfig?: NumberInputConfig;
}

export const CurrencyInput: FC<CurrencyInputProps> = (props) => {
  const {
    currency,
    style = {},
    displayConfig,
    inputConfig,
    ...passThrough
  } = props;

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
