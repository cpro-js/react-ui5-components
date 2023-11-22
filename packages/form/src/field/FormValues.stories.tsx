import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormValues, FormValuesProps } from "./FormValues";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

const Template: StoryFn<
  FormControllerProps<FormData> & FormValuesProps<FormData>
> = (args) => {
  const { initialValues, onSubmit } = args;

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <TextInputField name={"text"} />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
      <FormValues {...args} />
    </FormController>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  onSubmit: async (...args) => {
    console.log("submit", ...args);
    action("submit")(...args);
  },
  render: (values) => <div>Form Values {JSON.stringify(values)}</div>,
};

export const UpdateValuesOnSubmit = Standard.bind({});
UpdateValuesOnSubmit.args = {
  ...Standard.args,
  onSubmit: async (...args) => {
    console.log("submit", ...args);
    action("submit")(...args);

    const [values, actions] = args;

    actions.setValues([{ name: "text", value: "1" }]);
  },
};

export default {
  title: "Form/Field/FormValues",
  component: FormValues,
};
