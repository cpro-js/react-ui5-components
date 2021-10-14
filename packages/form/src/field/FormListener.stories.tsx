import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormListener, FormListenerProps } from "./FormListener";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

const Template: Story<
  FormControllerProps<FormData> & FormListenerProps<FormData>
> = (args) => {
  const { initialValues, onSubmit } = args;

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <TextInputField name={"text"} />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
      <FormListener {...args} />
    </FormController>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  onSubmit: async (...args) => {
    action("submit")(...args);

    const [values, actions] = args;

    actions.setValues([
      { name: "text", value: "Random value: " + new Date().getTime() },
    ]);
  },
  onChange: (...args) => {
    action("change")(...args);
  },
};

export default {
  title: "Form/Field/FormListener",
  component: FormListener,
};
