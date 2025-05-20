import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";
import { useRef } from "react";

import { FormController } from "../form/FormController";
import { CheckboxField } from "./CheckboxField";
import { CheckboxFieldGroup } from "./CheckboxFieldGroup";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldRef } from "./types";

interface FormData {
  value?: Array<string>;
}

export default {
  title: "Form/Field/CheckboxFieldGroup/InteractionTests",
  component: CheckboxFieldGroup,
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
  args: {},
} satisfies Meta<typeof CheckboxFieldGroup>;

type Story = StoryObj<typeof CheckboxFieldGroup>;

const mockSubmit = fn();

export const RequiredTest = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <CheckboxFieldGroup name="value" required>
          <CheckboxField
            data-testid="required-cake"
            value="cake"
            text={"Cake"}
          />
          <CheckboxField
            data-testid="required-waffles"
            value="waffles"
            text={"Waffles"}
          />
          <CheckboxField
            data-testid="required-burger"
            value="burger"
            text={"Burger"}
          />
        </CheckboxFieldGroup>

        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      const checkboxCake = canvas.getByTestId("required-cake");
      const checkboxWaffles = canvas.getByTestId("required-waffles");
      const checkboxBurger = canvas.getByTestId("required-burger");

      expect(checkboxCake.getAttribute("value-state")).toBe("Negative");
      expect(checkboxWaffles.getAttribute("value-state")).toBe("Negative");
      expect(checkboxBurger.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const PrefilledTest: Story = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData>
        onSubmit={handleSubmit}
        initialValues={{ value: ["waffles", "cake"] }}
      >
        <CheckboxFieldGroup {...props} name="value">
          <CheckboxField data-testid="checkbox-cake" value="cake" text="Cake" />
          <CheckboxField
            data-testid="checkbox-waffles"
            value="waffles"
            text="Waffles"
          />
          <CheckboxField
            data-testid="checkbox-burger"
            value="burger"
            text="Burger"
          />
        </CheckboxFieldGroup>

        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cake = canvas.getByTestId("checkbox-cake") as HTMLInputElement;
    const waffles = canvas.getByTestId("checkbox-waffles") as HTMLInputElement;
    const burger = canvas.getByTestId("checkbox-burger") as HTMLInputElement;

    await waitFor(() => {
      expect(cake.checked).toBe(true);
      expect(waffles.checked).toBe(true);
      expect(burger.checked).toBe(false);
    });

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { value: ["waffles", "cake"] },
        expect.anything()
      );
    });
  },
};
