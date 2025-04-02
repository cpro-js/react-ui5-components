import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { RadioButtonField } from "./RadioButtonField";
import { RadioButtonFieldGroup } from "./RadioButtonFieldGroup";

interface FormData {
  value?: string;
}

export default {
  title: "Form/Field/RadioButtonFieldGroup",
  component: RadioButtonFieldGroup,
  args: {
    name: "value",
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
      onSubmit: action("onSubmit"),
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
        <RadioButtonFieldGroup {...props}>
          <RadioButtonField value="cake" text={"Cake"} />
          <RadioButtonField value="waffles" text={"Waffles"} />
          <RadioButtonField value="burger" text={"Burger"} />
        </RadioButtonFieldGroup>
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
} satisfies Meta<typeof RadioButtonFieldGroup>;

type Story = StoryObj<typeof RadioButtonFieldGroup>;

export const Empty = {
  args: {},
} satisfies Story;

export const Prefilled = {
  args: {},
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
