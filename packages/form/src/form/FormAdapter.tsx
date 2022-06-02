import { FC, ReactNode, createContext, useContext } from "react";

import { ISO8601DateAdapter } from "./adapter/date/ISO8601DateAdapter";
import { ISODateTimeAdapter } from "./adapter/date/ISODateTimeAdapter";
import { DateAdapter } from "./adapter/type/DateAdapter";

export interface FormAdapterContextProps {
  /**
   * Adapter for custom transformation of date values.
   * Default: ISO8601 (yyyy-MM-dd)
   */
  date: DateAdapter<Date | string | number>;
  dateTime: DateAdapter<Date | string | number>;
}

export const FormAdapterContext = createContext<FormAdapterContextProps>({
  date: ISO8601DateAdapter,
  dateTime: ISODateTimeAdapter,
});

export interface FormAdapterProps extends Partial<FormAdapterContextProps> {
  children?: ReactNode;
}

export const FormAdapter: FC<Partial<FormAdapterProps>> = ({
  children,
  ...context
}) => {
  const existingContext = useContext(FormAdapterContext);

  // update existing context with new methods
  return (
    <FormAdapterContext.Provider value={{ ...existingContext, ...context }}>
      {children}
    </FormAdapterContext.Provider>
  );
};
