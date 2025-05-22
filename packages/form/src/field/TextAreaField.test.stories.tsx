import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

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
  args: {
    onFocus: fn(),
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
