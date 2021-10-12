import { isValidDate, toISO8601DateString } from "../../../util/date";
import { DateAdapter } from "../type/DateAdapter";

const ISO_DATE_REGEX = /^(\d{4})-([0][1-9]|1[0-2])-([0-2][1-9]|[1-3]0|3[01])$/;

/**
 * ISO8601 Date Adapter
 * Parses date strings with format `yyyy-MM-dd`
 * Everything else will be ignored
 */
export const ISO8601DateAdapter: DateAdapter<string> = {
  parse(value: string): Date | null {
    // Note: we need to check for string cause we may receive any data type here
    if (value == null || typeof value !== "string") {
      return null;
    }

    const resultIso = value.match(ISO_DATE_REGEX);
    if (resultIso) {
      // we need parse the ISO string by hand to get a date in user timezone instead of UTC
      const parsedValue = new Date(
        Number(resultIso[1]),
        Number(resultIso[2]) - 1,
        Number(resultIso[3])
      );
      if (isValidDate(parsedValue)) {
        return parsedValue;
      }
    }

    return null;
  },
  format(date: Date): string {
    return toISO8601DateString(date);
  },
};
