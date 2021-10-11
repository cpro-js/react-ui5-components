export interface DateAdapter<TDate extends Date | string | number> {
  /**
   * Convert custom date type to date instance.
   * Should return null for invalid dates
   *
   * @param value date instance
   */
  parse(value: TDate): Date | null;

  /**
   * Converts javascript date instance into custom date type
   * @param date
   */
  format(date: Date): TDate;
}
