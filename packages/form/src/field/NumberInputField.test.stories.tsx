import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { NumberInputField } from "./NumberInputField";

interface FormData {
  theNumber?: number;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/NumberInputField/Interactions",
  component: NumberInputField,
  args: {
    onFocus: fn(),
    onInput: fn(),
    onBlur: fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof NumberInputField>;

type Story = StoryObj<typeof NumberInputField>;

export const PrefilledTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData>
        onSubmit={handleSubmit}
        initialValues={{ theNumber: 123456.789 }}
      >
        <NumberInputField
          data-testid="prefilled-number"
          {...props}
          name="theNumber"
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
        { theNumber: 123456.789 },
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
        <NumberInputField
          data-testid="number-input"
          {...props}
          name="theNumber"
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
      const inputField = canvas.getByTestId("number-input");
      expect(inputField.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const OnSubmitTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <NumberInputField
          data-testid="number-submit"
          {...props}
          name="theNumber"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("number-submit") as HTMLElement;
    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;
    console.log(input);
    await userEvent.type(input, "42");

    input.dispatchEvent(new Event("change", { bubbles: true }));

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { theNumber: 42 },
        expect.anything()
      );
    });
  },
} satisfies Story;
