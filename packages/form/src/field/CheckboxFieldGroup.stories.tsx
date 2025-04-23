import { Meta, StoryObj } from "@storybook/react";

import { FormController } from "../form/FormController";
import { CheckboxField } from "./CheckboxField";
import { CheckboxFieldGroup } from "./CheckboxFieldGroup";
import { FormViewer, useFormViewer } from "./FormViewer";

interface FormData {
  value?: Array<string>;
}

export default {
  title: "Form/Field/CheckboxFieldGroup",
  component: CheckboxFieldGroup,
  parameters: {
    form: {
      initialValues: {},
    },
  },
  render(props, context) {
    const { initialValues, onSubmit, ...formControllerProps } =
      context.parameters.form;

    const { submittedValues, handleSubmit } = useFormViewer({
      onSubmit: onSubmit,
    });
    return (
      <FormController<FormData>
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <CheckboxFieldGroup {...props} name="value">
          <CheckboxField value="cake" text={"Cake"} />
          <CheckboxField value="waffles" text={"Waffles"} />
          <CheckboxField value="burger" text={"Burger"} />
        </CheckboxFieldGroup>
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
} satisfies Meta<typeof CheckboxFieldGroup>;

type Story = StoryObj<typeof CheckboxFieldGroup>;

export const Empty = {
  args: {},
} satisfies Story;

export const PrefilledSingle = {
  parameters: {
    form: {
      initialValues: {
        value: ["waffles"],
      },
    },
  },
} satisfies Story;

export const PrefilledMultiple = {
  parameters: {
    form: {
      initialValues: {
        value: ["waffles", "cake"],
      },
    },
  },
} satisfies Story;

export const Disabled = {
  parameters: {
    ...PrefilledSingle.parameters,
  },
  args: {
    disabled: true,
  },
} satisfies Story;

export const Readonly = {
  parameters: {
    ...PrefilledSingle.parameters,
  },
  args: {
    readonly: true,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    required: true,
  },
} satisfies Story;
