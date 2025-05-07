import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { RadioButtonField } from "./RadioButtonField";

interface FormData {
  value?: string;
}

export default {
  title: "Form/Field/RadioButtonField",
  component: RadioButtonField,
  args: {
    onFocus: fn(),
  },
  parameters: {
    docs: {
      story: {
        inline: false, // we need to render each story in isolation to prevent synchronization of radio buttons due to same name, otherwise last checked state wins
        iframeHeight: 200,
      },
    },
    form: {
      initialValues: {},
      onSubmit: action("form-submit"),
    },
  },
  render(props, context) {
    const { onSubmit, ...formControllerProps } = context.parameters.form;

    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: onSubmit,
    });

    return (
      <FormController<FormData>
        {...formControllerProps}
        onSubmit={handleSubmit}
      >
        <RadioButtonField {...props} name="value" value="cake" text={"Cake"} />
        <RadioButtonField
          {...props}
          name="value"
          value="waffles"
          text={"Waffles"}
        />
        <RadioButtonField
          {...props}
          name="value"
          value="burger"
          text={"Burger"}
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
} satisfies Meta<typeof RadioButtonField>;

type Story = StoryObj<typeof RadioButtonField>;

export const Empty = {} satisfies Story;

export const Prefilled = {
  parameters: {
    form: {
      initialValues: {
        value: "waffles",
      },
    },
  },
} satisfies Story;

export const Disabled = {
  ...Prefilled,
  args: {
    disabled: true,
  },
} satisfies Story;

export const Readonly = {
  ...Prefilled,
  args: {
    readonly: true,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    required: true,
  },
} satisfies Story;

const mockSubmit = fn();
export const InteractionTests = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData>
        onSubmit={handleSubmit}
        initialValues={{ value: "waffles" }}
      >
        <RadioButtonField {...props} name="value" value="cake" text={"Cake"} />
        <RadioButtonField
          {...props}
          name="value"
          value="waffles"
          text={"Waffles"}
        />
        <RadioButtonField
          {...props}
          name="value"
          value="burger"
          text={"Burger"}
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
        { value: "waffles" },
        expect.anything()
      );
    });
  },
} satisfies Story;

export const InteractionTestsRequired = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <RadioButtonField
          {...props}
          {...ValidationRequired.args}
          data-testid="required1"
          name="value"
          value="cake"
          text={"Cake"}
        />
        <RadioButtonField
          {...props}
          {...ValidationRequired.args}
          data-testid="required2"
          name="value"
          value="waffles"
          text={"Waffles"}
        />
        <RadioButtonField
          {...props}
          {...ValidationRequired.args}
          data-testid="required3"
          name="value"
          value="burger"
          text={"Burger"}
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
      const required1 = canvas.getByTestId("required1");
      const required2 = canvas.getByTestId("required2");
      const required3 = canvas.getByTestId("required3");
      expect(required1.getAttribute("value-state")).toBe("Negative");
      expect(required2.getAttribute("value-state")).toBe("Negative");
      expect(required3.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
