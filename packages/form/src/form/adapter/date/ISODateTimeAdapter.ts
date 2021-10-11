import { DateAdapter } from "../type/DateAdapter";

/**
 * JavaScript ISO-Date Adapter (same format as Date.prototype.toISOString())
 * Parses date strings with format `YYYY-MM-DDTHH:mm:ss.sssZ`
 * Everything else will be ignored
 */
export const ISODateTimeAdapter: DateAdapter<string> = {
  parse(value: string): Date | null {
    // Note: we need to check for string cause we may receive any data type here
    if (value == null || typeof value !== "string") {
      return null;
    }

    // check for iso date string
    const parsedValue = new Date(value);
    if (!isNaN(Number(parsedValue)) && parsedValue.toISOString() === value) {
      return parsedValue;
    }

    return null;
  },
  format(date: Date): string {
    return date.toISOString();
  },
};
