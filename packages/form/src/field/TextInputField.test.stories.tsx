import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, waitFor, within } from "storybook/test";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/TextInputField/InteractionTests",
  component: TextInputField,
  tags: ["!autodocs"],
  parameters: {
    docs: { disable: true },
  },
  args: {
    onFocus: fn(),
    onInput: fn(),
    onChange: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof TextInputField>;

type Story = StoryObj<typeof TextInputField>;

export const PrefilledTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController
        initialValues={{ text: "hello world" }}
        onSubmit={handleSubmit}
      >
        <TextInputField {...props} name="text" data-testid="text-input" />
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
        { text: "hello world" },
        expect.anything()
      );
    });

    const host = canvas.getByTestId("text-input") as HTMLElement;
    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;

    input.select(), await userEvent.keyboard("{Backspace}");

    const newText = "typing something new";
    await userEvent.type(input, newText);
    input.dispatchEvent(new Event("change", { bubbles: true }));

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { text: newText },
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
      <FormController onSubmit={handleSubmit}>
        <TextInputField {...props} name="text" data-testid="text-required" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      const input = canvas.getByTestId("text-required");
      expect(input.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const UserSubmitTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <TextInputField {...props} name="text" data-testid="text-user-input" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("text-user-input") as HTMLElement;
    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;

    await userEvent.type(input, "storybook test");
    input.dispatchEvent(new Event("change", { bubbles: true }));

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { text: "storybook test" },
        expect.anything()
      );
    });
  },
} satisfies Story;
