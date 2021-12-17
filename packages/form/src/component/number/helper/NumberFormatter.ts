export class NumberFormatter {
  private formatter: Intl.NumberFormat;

  constructor(locale: string, options?: Intl.NumberFormatOptions) {
    this.formatter = new Intl.NumberFormat(locale, options);
  }

  public format = (value?: number): string => {
    return value || value === 0 ? this.formatter.format(value) : "";
  };
}

const FORMATTERS: Record<string, NumberFormatter> = {};

export function getFormatter(
  locale?: string,
  options?: Intl.NumberFormatOptions
) {
  const loc = locale || "en";
  const key = `${loc}_${
    options
      ? Object.entries(options)
          .map(([key, val]) => `${key}:${val}`)
          .join("_")
      : ""
  }`;

  if (!FORMATTERS[key]) {
    FORMATTERS[key] = new NumberFormatter(loc, options);
  }

  return FORMATTERS[key];
}
