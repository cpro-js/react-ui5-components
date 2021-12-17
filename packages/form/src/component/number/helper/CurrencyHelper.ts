import { NumberFormatter } from "./NumberFormatter";

export const getCurrencyConfig = (toMerge: Intl.NumberFormatOptions = {}) => ({
  ...toMerge,
  currency: "USD",
  currencyDisplay: "code",
});

export const getCurrencyFormatter = (formatter: NumberFormatter) => {
  return (val?: number) => {
    if (!val && val !== 0) {
      return "";
    }

    return formatter.format(val).replace(/[\s]*USD[\s]*/, "");
  };
};
