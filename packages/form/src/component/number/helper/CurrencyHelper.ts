import { NumberFormatter } from "./NumberFormatter";

export const getCurrencyConfig = (
  toMerge: Intl.NumberFormatOptions = {},
  currency: string
) => ({
  ...toMerge,
  currency,
  currencyDisplay: "code",
});

export const getCurrencyFormatter = (
  formatter: NumberFormatter,
  currency: string
) => {
  return (val?: number) => {
    if (!val && val !== 0) {
      return "";
    }

    const regExp = new RegExp(`[^0-9]*${currency}[^0-9]*`);
    return formatter.format(val).replace(regExp, "");
  };
};
