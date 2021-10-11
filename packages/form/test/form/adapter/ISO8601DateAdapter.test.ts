import { ISO8601DateAdapter } from "../../../src/form/adapter/date/ISO8601DateAdapter";

const values: Array<{ formattedValue: string; parsedValue: Date | null }> = [
  {
    formattedValue: "2011-01-01",
    parsedValue: new Date(2011, 1 - 1, 1),
  },
  {
    formattedValue: "2021-10-31",
    parsedValue: new Date(2021, 10 - 1, 31),
  },
  {
    formattedValue: "2021/10/31",
    parsedValue: null,
  },
  {
    formattedValue: "2021/13/31",
    parsedValue: null,
  },
  {
    formattedValue: "",
    parsedValue: null,
  },
  {
    // @ts-expect-error
    formattedValue: 1,
    parsedValue: null,
  },
];

describe(".parse(...)", () => {
  values.forEach(({ formattedValue, parsedValue }) => {
    test(`parses '${formattedValue}'`, () => {
      const date = ISO8601DateAdapter.parse(formattedValue);

      expect(date).toStrictEqual(parsedValue);
    });
  });
});

describe(".format(...)", () => {
  values
    .filter(
      (item): item is { formattedValue: string; parsedValue: Date } =>
        item.parsedValue != null
    )
    .forEach(({ formattedValue, parsedValue }) => {
      test(`formats '${formattedValue}'`, () => {
        const date = ISO8601DateAdapter.format(parsedValue);

        expect(date).toStrictEqual(formattedValue);
      });
    });
});
