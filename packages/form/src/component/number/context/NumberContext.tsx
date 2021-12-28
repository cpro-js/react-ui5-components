import { FC, createContext, useContext } from "react";

export interface NumberContextProps {
  locale: string;
  currency?: string;
}

export const NumberContext = createContext<NumberContextProps>({
  locale: "en-US",
});

export interface NumberI18nProviderProps extends Partial<NumberContextProps> {}

export const NumberI18nProvider: FC<NumberI18nProviderProps> = (props) => {
  const { children, ...context } = props;
  const existingContext = useContext(NumberContext);

  return (
    <NumberContext.Provider value={{ ...existingContext, ...context }}>
      {children}
    </NumberContext.Provider>
  );
};
