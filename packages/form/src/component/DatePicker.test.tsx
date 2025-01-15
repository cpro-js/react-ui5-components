import { convertToDate } from "./DatePicker";

test("should return null for null value", () => {
  expect(convertToDate(null, (value) => new Date(value))).toBe(null);
});
