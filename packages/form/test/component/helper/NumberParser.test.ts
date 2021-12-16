import { NumberParser } from "./../../../src/component/helper/NumberParser";

describe("NumberParser Test", () => {
  const PARSER_EN = new NumberParser("en");
  const PARSER_DE = new NumberParser("de");
  const PARSER_IN = new NumberParser("en-IN");

  test("parses number", () => {
    expect(PARSER_EN.parse("123")).toEqual(123);
    expect(PARSER_EN.parse("123.")).toEqual(123);
    expect(PARSER_EN.parse("123.4")).toEqual(123.4);
    expect(PARSER_EN.parse("123.456")).toEqual(123.456);
  });

  test("parses number with grouping", () => {
    expect(PARSER_EN.parse("123,456", true)).toEqual(123456);
    expect(PARSER_EN.parse("123,456.789", true)).toEqual(123456.789);
  });

  test("parses zero", () => {
    expect(PARSER_EN.parse("0")).toBe(0);
    expect(PARSER_EN.parse("0.0")).toBe(0);
  });

  test("returns undefined if not a number", () => {
    // @ts-expect-error
    expect(PARSER_EN.parse(undefined)).toBeUndefined();
    // @ts-expect-error
    expect(PARSER_EN.parse(null)).toBeUndefined();
    expect(PARSER_EN.parse("")).toBeUndefined();
    expect(PARSER_EN.parse("A")).toBeUndefined();
    expect(PARSER_EN.parse("123AB")).toBeUndefined();
    expect(PARSER_EN.parse("123..456")).toBeUndefined();
    expect(PARSER_EN.parse("123.456.789")).toBeUndefined();
    expect(PARSER_EN.parse("123,456")).toBeUndefined();
  });

  test("parses German number style", () => {
    expect(PARSER_DE.parse("123")).toEqual(123);
    expect(PARSER_DE.parse("123,")).toEqual(123);
    expect(PARSER_DE.parse("123,456")).toEqual(123.456);
    expect(PARSER_DE.parse("123.456")).toBe(123.456); //English notation always works like in Chrome!
    expect(PARSER_DE.parse("123.456", true)).toEqual(123456);
    expect(PARSER_DE.parse("123.456,789", true)).toEqual(123456.789);
    expect(PARSER_DE.parse("0")).toBe(0);
    expect(PARSER_DE.parse("0,0")).toBe(0);

    expect(PARSER_DE.parse("1,21,3")).toBeUndefined();
    expect(PARSER_DE.parse("123,456,789")).toBeUndefined();
  });

  test("parses Indian number style", () => {
    expect(PARSER_IN.parse("123")).toEqual(123);
    expect(PARSER_IN.parse("123.456")).toEqual(123.456);
    expect(PARSER_IN.parse("1,23,456", true)).toEqual(123456);
    expect(PARSER_IN.parse("1,23,45,678.9", true)).toEqual(12345678.9);
    // expect(PARSER_IN.parse("123,456...789")).toBeUndefined();
    expect(PARSER_IN.parse("0")).toBe(0);
    expect(PARSER_IN.parse("0.0")).toBe(0);

    expect(PARSER_IN.parse("1.21.3")).toBeUndefined();
    expect(PARSER_IN.parse("1.23.456")).toBeUndefined();
  });
});
