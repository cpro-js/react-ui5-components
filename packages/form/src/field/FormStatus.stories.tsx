import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormStatus, FormStatusProps } from "./FormStatus";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & FormStatusProps> = (
  args
) => {
  const { initialValues, onSubmit } = args;

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <TextInputField name={"text"} />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
      <FormStatus {...args} />
    </FormController>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  onSubmit: async (...args) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    action("submit")(...args);
  },
  render: (state) => (
    <div>
      Submitting {JSON.stringify(state.isSubmitting)}, Dirty{" "}
      {JSON.stringify(state.isDirty)}, Valid {JSON.stringify(state.isValid)},
      Validating {JSON.stringify(state.isValidating)}
    </div>
  ),
};

export default {
  title: "Form/Field/FormStatus",
  component: FormStatus,
};
