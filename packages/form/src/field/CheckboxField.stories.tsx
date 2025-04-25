import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";
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
  title: "Form/Field/CheckboxField",
  component: CheckboxField,
  parameters: {
    form: {
      initialValues: {},
    },
  },
  args: {
    onBlur: fn(),
    onFocus: fn(),
    onChange: fn(),
  },
  render(props, context) {
    const { onSubmit, initialValues, ...formControllerProps } =
      context.parameters.form;
    const fieldRef = useRef<FormFieldRef<FormData, "value">>(null);

    const isBoolean = typeof initialValues?.value === "boolean";

    if (isBoolean) {
      const { submittedValues, handleSubmit } = useFormViewer<FormDataBoolean>({
        onSubmit,
      });

      return (
        <FormController<FormDataBoolean>
          {...formControllerProps}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <CheckboxField
            data-testid="checkbox"
            {...props}
            ref={fieldRef}
            name="value"
          />
          <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
        </FormController>
      );
    } else {
      const { submittedValues, handleSubmit } = useFormViewer<FormData>({
        onSubmit,
      });

      return (
        <FormController<FormData>
          {...formControllerProps}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <CheckboxField
            data-testid="checkbox"
            {...props}
            ref={fieldRef}
            name="value"
          />
          <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
        </FormController>
      );
    }
  },
} satisfies Meta<typeof CheckboxField>;

type Story = StoryObj<typeof CheckboxField>;

export const Empty = {
  args: {},
} satisfies Story;

export const Prefilled = {
  parameters: {
    form: {
      initialValues: {
        value: "on",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(canvas.getByText(/"value": ?"on"/)).toBeInTheDocument();
    });
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Readonly = {
  args: {
    readonly: true,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    required: true,
  },
} satisfies Story;

export const BooleanEmpty = {
  args: {
    boolean: true,
  },
};

export const BooleanPrefilled = {
  args: {
    ...BooleanEmpty.args,
  },
  parameters: {
    form: {
      initialValues: {
        value: true,
      },
    },
  },
} satisfies Story;

export const BooleanDisabled = {
  args: {
    ...BooleanEmpty.args,
    disabled: true,
  },
} satisfies Story;

export const BooleanReadonly = {
  args: {
    ...BooleanEmpty.args,
    readonly: true,
  },
} satisfies Story;

export const BooleanValidationRequired = {
  args: {
    ...BooleanEmpty.args,
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      const checkbox = canvas.getByTestId("checkbox");
      expect(checkbox.getAttribute("value-state")).toBe("Negative");
    });
  },
} satisfies Story;

export const InteractionTests = {
  render: () => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: (values) => console.log("Submitted", values),
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <CheckboxField
          data-testid="boolean-required"
          name="booleanRequired"
          {...BooleanValidationRequired.args}
        />

        <CheckboxField
          data-testid="required"
          name="requiredField"
          {...ValidationRequired.args}
        />

        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText("Submit"));

    await waitFor(() => {
      const required = canvas.getByTestId("required");
      const booleanRequired = canvas.getByTestId("boolean-required");
      expect(required.getAttribute("value-state")).toBe("Negative");
      expect(booleanRequired.getAttribute("value-state")).toBe("Negative");
    });
  },
} satisfies Story;
