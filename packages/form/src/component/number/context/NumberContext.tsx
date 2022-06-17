import { FC, createContext, useContext } from "react";

import { CurrencyInputProps } from "../CurrencyInput";
import { NumberInputProps } from "../NumberInput";
import { CommonNumberInputProps, NumberDisplayConfig } from "../NumberModel";

export interface NumberContextProps
  extends NumberDisplayConfig,
    NumberInputProps,
    Pick<
      CommonNumberInputProps,
      "showNumberWarningMessages" | "getNumberWarningMessage"
    >,
    Pick<CurrencyInputProps, "currency" | "showCurrency"> {
  locale: string;
}

export const NumberContext = createContext<NumberContextProps>({
  locale: "en-US",
});

export interface NumberContextProviderProps
  extends Partial<NumberContextProps> {}

export const NumberContextProvider: FC<NumberContextProviderProps> = (
  props
) => {
  const { children, ...context } = props;
  const existingContext = useContext(NumberContext);

  return (
    <NumberContext.Provider value={{ ...existingContext, ...context }}>
      {children}
    </NumberContext.Provider>
  );
};
