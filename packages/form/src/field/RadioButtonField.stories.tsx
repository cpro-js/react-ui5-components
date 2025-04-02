import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { RadioButtonField } from "./RadioButtonField";

interface FormData {
  value?: string;
}

export default {
  title: "Form/Field/RadioButtonField",
  component: RadioButtonField,
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
