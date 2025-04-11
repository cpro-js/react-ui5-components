import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import type { SubmitHandler } from "react-hook-form";

import { FormController } from "../form/FormController";
import { FormStatus, FormStatusProps } from "./FormStatus";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

const meta = {
  title: "Form/Field/FormStatus",
  component: FormStatus,
  parameters: {
    form: {
      initialValues: {},
      onSubmit: (async (...args) => {
        await new Promise((r) => setTimeout(r, 2000));
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
        <FormStatus {...args} />
      </FormController>
    );
  },
} satisfies Meta<typeof FormStatus>;

export default meta;

type Story = StoryObj<typeof FormStatus>;

export const Standard = {
  args: {
    render: (state) => (
      <div>
        Submitting {JSON.stringify(state.isSubmitting)}, Dirty{" "}
        {JSON.stringify(state.isDirty)}, Valid {JSON.stringify(state.isValid)},
        Validating {JSON.stringify(state.isValidating)}
      </div>
    ),
  },
} satisfies Story;
