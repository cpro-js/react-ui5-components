/**
 * Source: https://observablehq.com/@mbostock/localized-number-parsing
 *
 * Adapted to TS.
 */
export class NumberParser {
  private group: RegExp;
  private decimal: RegExp;
  private numeral: RegExp;
  private index: any;

  private decimalSign: string;
  private groupSign: string;
  private maxFraction: number;

  constructor(locale: string) {
    const formatter = new Intl.NumberFormat(locale);

    const decimalTest = formatter.format(0.1111111111111111);
    this.maxFraction = decimalTest.length <= 1 ? 0 : decimalTest.length - 2;

    const parts = formatter.formatToParts(12345.6);
    this.decimalSign = parts.find((d) => d.type === "decimal")!.value;
    this.decimal = new RegExp(`[${this.decimalSign}]`);
    this.groupSign = parts.find((d) => d.type === "group")!.value;
    this.group = new RegExp(`[${this.groupSign}]`, "g");

    const numerals = [
      ...new Intl.NumberFormat(locale, { useGrouping: false }).format(
        9876543210
      ),
    ].reverse();
    const index = new Map(numerals.map((d, i) => [d, i]));
    this.numeral = new RegExp(`[${numerals.join("")}]`, "g");
    this.index = (d: string) => index.get(d);
  }

  public getDecimalSeparator() {
    return this.decimalSign;
  }

  public getGroupingSeparator() {
    return this.groupSign;
  }

  public getMaxFractionDigits() {
    return this.maxFraction;
  }

  public parse(formattedNumber?: string, allowGroup: boolean = false) {
    let fn = formattedNumber?.trim();
    if (!fn) {
      return undefined;
    }

    if (allowGroup) {
      fn = fn.replace(this.group, "");
    }

    const parsed = Number(
      fn.replace(this.decimal, ".").replace(this.numeral, this.index)
    );

    return parsed || parsed === 0 ? parsed : undefined;
  }
}

const PARSERS: Record<string, NumberParser> = {};

export function getParser(locale?: string) {
  const loc = locale || "en";
  if (!PARSERS[loc]) {
    PARSERS[loc] = new NumberParser(loc);
  }

  return PARSERS[loc];
}
