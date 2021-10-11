import { IdentityDateAdapter } from "../../../src/form/adapter/date/IdentityDateAdapter";

const values: Array<{ formattedValue: any; parsedValue: any }> = [
  {
    formattedValue: new Date(2021, 10 - 1, 31),
    parsedValue: new Date(2021, 10 - 1, 31),
  },
  {
    formattedValue: "2021-10-31",
    parsedValue: "2021-10-31",
  },
  {
    formattedValue: "2021/10/31",
    parsedValue: "2021/10/31",
  },
  {
    formattedValue: 1,
    parsedValue: 1,
  },
];

describe(".parse(...)", () => {
  values.forEach(({ formattedValue, parsedValue }) => {
    test(`parses '${formattedValue}'`, () => {
      const date = IdentityDateAdapter.parse(formattedValue);

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
        const date = IdentityDateAdapter.format(parsedValue);

        expect(date).toStrictEqual(formattedValue);
      });
    });
});
