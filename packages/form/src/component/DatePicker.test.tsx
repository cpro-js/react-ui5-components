import { convertToDate } from "./DatePicker";

describe("convertToDate", () => {
  const newDateFunction = (value: any) => new Date(value);

  test("should return null for null value", () => {
    expect(convertToDate(null, newDateFunction)).toBe(null);
  });

  test("should return the same Date object if value is a Date", () => {
    const date = new Date();
    const result = convertToDate(date, newDateFunction);
    expect(result).toBe(date);
  });

  test("should parse a valid string date to a Date object", () => {
    expect(convertToDate("2025-01-01", newDateFunction)).toEqual(
      new Date("2025-01-01")
    );
  });

  test("should return null for an invalid date string", () => {
    expect(convertToDate("invalid-date", (value) => null)).toBe(null);
  });
});
