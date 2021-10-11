export const pad = (number: number) => {
  if (number < 10) {
    return "0" + number;
  }
  return number;
};

/**
 * Formatts an date as ISO8601 date string (yyyy-MM-dd)
 * @param date
 */
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

export const isValidDate = (date: Date) => {
  return date != null && !isNaN(Number(date));
};
