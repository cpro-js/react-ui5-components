import { NumberFormatter } from "./NumberFormatter";

export const getCurrencyConfig = (
  toMerge: Intl.NumberFormatOptions = {},
  currency: string
): Intl.NumberFormatOptions => ({
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

    const regExp = new RegExp(`\\s*${currency}\\s*`);
    return formatter.format(val).replace(regExp, "");
  };
};
