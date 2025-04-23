import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import type { SubmitHandler } from "react-hook-form";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { HiddenField, HiddenFieldProps } from "./HiddenField";

interface FormData {
  text?: string;
}

const meta = {
  title: "Form/Field/HiddenField",
  component: HiddenField,
  parameters: {
    form: {
      initialValues: {},
      onSubmit: (async (...args) => {
        action("form-submit")(...args);
      }) satisfies SubmitHandler<FormData>,
    },
  },
  render(props, context) {
    const { initialValues, onSubmit } = context.parameters.form;
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit,
    });

    return (
      <FormController<FormData>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <HiddenField {...props} name="text" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
} satisfies Meta<typeof HiddenField>;

export default meta;

type Story = StoryObj<typeof HiddenField>;

export const Empty = {} satisfies Story;

export const Prefilled = {
  parameters: {
    form: {
      initialValues: {
        text: "hello world",
      },
    },
  },
} satisfies Story;
