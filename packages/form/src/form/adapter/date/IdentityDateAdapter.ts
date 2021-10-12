import { DateAdapter } from "../type/DateAdapter";

/**
 * JavaScript Date Adapter - no transformation
 */
export const IdentityDateAdapter: DateAdapter<Date> = {
  parse(value: Date): Date | null {
    return value;
  },
  format(date: Date): Date {
    return date;
  },
};
