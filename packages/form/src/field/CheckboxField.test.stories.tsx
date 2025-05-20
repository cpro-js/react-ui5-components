import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";
import { useRef } from "react";

import { FormController } from "../form/FormController";
import { CheckboxField } from "./CheckboxField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldRef } from "./types";

interface FormData {
  value?: string;
}

interface FormDataBoolean {
  value?: boolean;
}

export default {
  title: "Form/Field/CheckboxField/InteractionTests",
  component: CheckboxField,
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
    form: {
      initialValues: {},
      onSubmit: action("form-submit"),
    },
  },
  args: {
    onBlur: fn(),
    onFocus: fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof CheckboxField>;

type Story = StoryObj<typeof CheckboxField>;

const mockSubmit = fn();

export const RequiredTest = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <CheckboxField
          data-testid="boolean-required"
          name="booleanRequired"
          required
        />

        <CheckboxField data-testid="required" name="requiredField" required />

        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      const required = canvas.getByTestId("required");
      const booleanRequired = canvas.getByTestId("boolean-required");
      expect(required.getAttribute("value-state")).toBe("Negative");
      expect(booleanRequired.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const PrefilledTest = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormDataBoolean>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormDataBoolean>
        onSubmit={handleSubmit}
        initialValues={{ value: true }}
      >
        <CheckboxField data-testid="checkbox" name="value" boolean={true} />

        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = canvas.getByTestId("checkbox");

    await waitFor(() => {
      expect((checkbox as HTMLInputElement).checked).toBe(true);
    });

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { value: true },
        expect.anything()
      );
    });
  },
} satisfies Story;
