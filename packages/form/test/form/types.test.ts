import { PartialFormValues } from "../../src/field/types";

describe("PartialFormValues", () => {
  test("marks object attributes as optional", () => {
    interface FormData {
      valueString: string;
      valueNumber: number;
      valueDate: Date;
    }

    type PartialFormData = PartialFormValues<FormData>;

    const valuesEmpty: PartialFormData = {};

    const valuesUndefined: PartialFormData = {
      valueString: undefined,
      valueNumber: undefined,

      valueDate: undefined,
    };

    const valuesComplete: PartialFormData = {
      valueString: "test",
      valueNumber: 1,
      valueDate: new Date(),
    };

    expect(valuesEmpty).toBeDefined();
    expect(valuesUndefined).toBeDefined();
    expect(valuesComplete).toBeDefined();
  });

  test("marks nested objects & properties as optional", () => {
    interface FormData {
      nested: {
        valueString: string;
      };
    }

    type PartialFormData = PartialFormValues<FormData>;

    const valuesEmpty: PartialFormData = {};

    const valuesNestedUndefined: PartialFormData = {
      nested: undefined,
    };
    const valuesNestedPartial: PartialFormData = {
      nested: {},
    };

    const valuesComplete: PartialFormData = {
      nested: {
        valueString: "",
      },
    };

    expect(valuesEmpty).toBeDefined();
    expect(valuesNestedUndefined).toBeDefined();
    expect(valuesNestedPartial).toBeDefined();
    expect(valuesComplete).toBeDefined();
  });

  test("marks properties of array items as optional", () => {
    interface FormDataArrayItem {
      valueString: string;
    }

    interface FormData {
      items: Array<FormDataArrayItem>;
    }

    type PartialFormData = PartialFormValues<FormData>;

    const valuesEmpty: PartialFormData = {};

    const valuesItemsUndefined: PartialFormData = {
      items: undefined,
    };
    const valuesItemsEmpty: PartialFormData = {
      items: [],
    };

    const valuesItemsPartial: PartialFormData = {
      items: [{}],
    };

    const valuesItemsInvalid: PartialFormData = {
      // @ts-expect-error item should not be undefined, only the properties
      items: [undefined],
    };

    const valuesItemsComplete: PartialFormData = {
      items: [{ valueString: "test" }],
    };

    expect(valuesEmpty).toBeDefined();
    expect(valuesItemsUndefined).toBeDefined();
    expect(valuesItemsEmpty).toBeDefined();
    expect(valuesItemsPartial).toBeDefined();
    expect(valuesItemsInvalid).toBeDefined();
    expect(valuesItemsComplete).toBeDefined();
  });
});
