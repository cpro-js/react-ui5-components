import { createContext } from "react";

export interface NumberContextProps {
  locale: string;
  currency?: string;
}

export const NumberContext = createContext<NumberContextProps>({
  locale: "en-IN",
});

export const NumberLocaleProvider = NumberContext.Provider;
