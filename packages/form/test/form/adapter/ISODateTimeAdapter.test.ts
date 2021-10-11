import { ISODateTimeAdapter } from "../../../src/form/adapter/date/ISODateTimeAdapter";

const values: Array<{ formattedValue: string; parsedValue: Date | null }> = [
  {
    formattedValue: "2010-12-31T23:00:00.000Z",
    parsedValue: new Date("2010-12-31T23:00:00.000Z"),
  },
  {
    formattedValue: "2021-10-31",
    parsedValue: null,
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
      const date = ISODateTimeAdapter.parse(formattedValue);

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
        const date = ISODateTimeAdapter.format(parsedValue);

        expect(date).toStrictEqual(formattedValue);
      });
    });
});
