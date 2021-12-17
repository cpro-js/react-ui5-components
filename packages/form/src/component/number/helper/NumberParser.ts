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

  private currencyAppended: boolean;
  private decimalSign: string;
  private groupSign: string;

  constructor(locale: string) {
    const prependTest = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      currencyDisplay: "code",
    }).format(1);
    this.currencyAppended = !prependTest.startsWith("USD");

    const formatter = new Intl.NumberFormat(locale);
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

  public isCurrencyAppended() {
    return this.currencyAppended;
  }

  public getDecimalSeparator() {
    return this.decimalSign;
  }

  public getGroupingSeparator() {
    return this.groupSign;
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
