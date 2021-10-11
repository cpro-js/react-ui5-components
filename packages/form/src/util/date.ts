/**
 * Formatts an date as ISO8601 date string (yyyy-MM-dd)
 * @param date
 */
import { pad } from "./string";

export const toISO8601DateString = (date: Date) => {
  let year: number | string = date.getFullYear();
  let month: number | string = pad(date.getMonth() + 1);
  let day: number | string = pad(date.getDate());

  return [year, month, day].join("-");
};

/**
 * Formatts an date as JavaScript ISO date-time string (YYYY-MM-DDTHH:mm:ss.sssZ)
 * @param date
 */
export const toISODateTimeString = (date: Date) => {
  return date.toISOString();
};

/**
 * Checks if the provided date instance is valid
 * @param date
 */
export const isValidDate = (date: Date) => {
  return date != null && !isNaN(Number(date));
};
