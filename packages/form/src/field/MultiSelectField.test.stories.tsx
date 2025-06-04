import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent } from "@storybook/test";
import { waitFor, within } from "@testing-library/react";

import { MultiSelectItem } from "../component/MultiSelect";
import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { MultiSelectField } from "./MultiSelectField";

export interface MultiSelectItemAlt extends MultiSelectItem {
  alt: string;
}

const items: Array<MultiSelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
];

interface FormData {
  item?: Array<string | number>;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/MultiSelectField/Interactions",
  component: MultiSelectField,
  args: {
    onInput: fn(),
    onFocus: fn(),
    onChange: fn(),
    onOpen: fn(),
    onBlur: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof MultiSelectField>;

type Story = StoryObj<typeof MultiSelectField>;

export const PrefilledTest = {
  args: {
    items,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });
    return (
      <FormController<FormData>
        onSubmit={handleSubmit}
        initialValues={{ item: [items[1].value] }}
      >
        <MultiSelectField
          {...props}
          name="item"
          data-testid="prefilled-multiselect"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        {
          item: [items[1].value],
        },
        expect.anything()
      );
    });

    //User adding another element
    const field = canvas.getByTestId("prefilled-multiselect") as HTMLElement;
    const input = field.shadowRoot?.querySelector("input") as HTMLInputElement;

    await userEvent.type(input, "Test 3");

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        {
          item: [items[1].value, items[3].value],
        },
        expect.anything()
      );
    });
  },
} satisfies Story;

export const RequiredTest = {
  args: {
    required: true,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });
    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <MultiSelectField
          {...props}
          name="item"
          data-testid="required-multiselect"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      const inputField = canvas.getByTestId("required-multiselect");
      expect(inputField.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
