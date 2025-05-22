import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { RadioButtonField } from "./RadioButtonField";
import { RadioButtonFieldGroup } from "./RadioButtonFieldGroup";

interface FormData {
  value?: string;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/RadioButtonFieldGroup/InteractionTests",
  component: RadioButtonFieldGroup,
  args: {
    onFocus: fn(),
  },
  parameters: {
    docs: { disable: true },
  },
} satisfies Meta<typeof RadioButtonFieldGroup>;

type Story = StoryObj<typeof RadioButtonFieldGroup>;

export const PrefilledTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData>
        initialValues={{ value: "waffles" }}
        onSubmit={handleSubmit}
      >
        <RadioButtonFieldGroup {...props} name="value">
          <RadioButtonField data-testid="radio-cake" value="cake" text="Cake" />
          <RadioButtonField
            data-testid="radio-waffles"
            value="waffles"
            text="Waffles"
          />
          <RadioButtonField
            data-testid="radio-burger"
            value="burger"
            text="Burger"
          />
        </RadioButtonFieldGroup>
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
        { value: "waffles" },
        expect.anything()
      );
    });
  },
} satisfies Story;

export const RequiredTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <RadioButtonFieldGroup {...props} name="value" required>
          <RadioButtonField
            data-testid="required-radio-cake"
            value="cake"
            text="Cake"
          />
          <RadioButtonField
            data-testid="required-radio-waffles"
            value="waffles"
            text="Waffles"
          />
          <RadioButtonField
            data-testid="required-radio-burger"
            value="burger"
            text="Burger"
          />
        </RadioButtonFieldGroup>
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      const radio1 = canvas.getByTestId("required-radio-cake");
      const radio2 = canvas.getByTestId("required-radio-waffles");
      const radio3 = canvas.getByTestId("required-radio-burger");

      expect(radio1.getAttribute("value-state")).toBe("Negative");
      expect(radio2.getAttribute("value-state")).toBe("Negative");
      expect(radio3.getAttribute("value-state")).toBe("Negative");

      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
