import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { SelectField } from "./SelectField";

interface FormData {
  item?: string | number;
}

const mockSubmit = fn();

const items = [
  { value: 1, label: "Test 1 Number" },
  { value: "1", label: "Test 1 String" },
  { value: "2", label: "Test 2" },
];

export default {
  title: "Form/Field/SelectField/InteractionTests",
  component: SelectField,
  tags: ["!autodocs"],
  parameters: {
    docs: { disable: true },
  },
  args: {
    onFocus: fn(),
    onInput: fn(),
    onChange: fn(),
    onBlur: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof SelectField>;

type Story = StoryObj<typeof SelectField>;

export const PrefilledTest = {
  args: {
    items,
    addEmptyOption: true,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData>
        initialValues={{ item: "1" }}
        onSubmit={handleSubmit}
      >
        <SelectField data-testid="select-prefilled" {...props} name="item" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ item: "1" }, expect.anything());
    });

    const host = canvas.getByTestId("select-prefilled") as HTMLElement;
    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;

    input.select();

    await userEvent.keyboard("{Backspace}");

    await userEvent.type(input, "Test 2");

    await userEvent.keyboard("{Enter}");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ item: "2" }, expect.anything());
    });
  },
} satisfies Story;

export const RequiredTest = {
  args: {
    items,
    addEmptyOption: true,
    required: true,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <SelectField data-testid="select-required" {...props} name="item" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      const select = canvas.getByTestId("select-required");
      expect(select.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const UserSubmitTest = {
  args: {
    items,
    addEmptyOption: true,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <SelectField data-testid="select-user" {...props} name="item" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("select-user") as HTMLElement;

    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;

    input.focus();

    await userEvent.type(input, "Te");

    await userEvent.keyboard("{Enter}");
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ item: 1 }, expect.anything());
    });
  },
} satisfies Story;
