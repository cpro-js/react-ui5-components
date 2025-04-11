import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import type { SubmitHandler } from "react-hook-form";

import { FormController } from "../form/FormController";
import { FormValues, FormValuesProps } from "./FormValues";
import { TextInputField } from "./TextInputField";
import { FormActions } from "./types";

interface FormData {
  text?: string;
}

const meta = {
  title: "Form/Field/FormValues",
  component: FormValues,
  parameters: {
    form: {
      initialValues: {},
      onSubmit: (async (...args) => {
        action("submit")(...args);
      }) satisfies SubmitHandler<FormData>,
    },
  },
  render(args, context) {
    const { initialValues, onSubmit } = context.parameters.form;

    return (
      <FormController<FormData>
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <TextInputField name="text" />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
        <FormValues {...args} />
      </FormController>
    );
  },
} satisfies Meta<typeof FormValues>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard = {
  args: {
    render: (values) => <div>Form Values {JSON.stringify(values)}</div>,
  },
} satisfies Story;

export const UpdateValuesOnSubmit = {
  args: {
    render: (values) => <div>Form Values {JSON.stringify(values)}</div>,
  },
  parameters: {
    form: {
      onSubmit: async (
        ...args: Parameters<
          (values: FormData, actions: FormActions<FormData>) => void
        >
      ) => {
        const [values, actions] = args;
        action("submit")(values, actions);
        actions.setValues([{ name: "text", value: "1" }]);
      },
    },
  },
} satisfies Story;
