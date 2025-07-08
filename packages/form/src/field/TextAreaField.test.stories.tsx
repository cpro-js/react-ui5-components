import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, waitFor, within } from "storybook/test";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { TextAreaField } from "./TextAreaField";

interface FormData {
  text?: string;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/TextAreaField/InteractionTests",
  component: TextAreaField,
  tags: ["!autodocs"],
  args: {
    onFocus: fn(),
    onInput: fn(),
    onChange: fn(),
    onBlur: fn(),
  },
  parameters: {
    docs: { disable: true },
  },
} satisfies Meta<typeof TextAreaField>;

type Story = StoryObj<typeof TextAreaField>;

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
        <TextAreaField {...props} name="text" data-testid="textarea" />
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

    const host = canvas.getByTestId("textarea") as HTMLElement;
    const input = host.shadowRoot?.querySelector(
      "textarea"
    ) as HTMLTextAreaElement;

    input.select();

    await userEvent.keyboard("{Backspace}");

    const newText = "This is a new test message.";
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
        <TextAreaField {...props} name="text" data-testid="textarea-required" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      const field = canvas.getByTestId("textarea-required");
      expect(field.getAttribute("value-state")).toBe("Negative");
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
        <TextAreaField {...props} name="text" data-testid="textarea-user" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByTestId("textarea-user") as HTMLElement;
    const input = textarea.shadowRoot?.querySelector(
      "textarea"
    ) as HTMLTextAreaElement;

    await userEvent.type(input, "This is a test message.");

    input.dispatchEvent(new Event("change", { bubbles: true }));

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { text: "This is a test message." },
        expect.anything()
      );
    });
  },
} satisfies Story;
