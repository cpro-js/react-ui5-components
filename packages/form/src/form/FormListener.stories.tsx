import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { TextInputField } from "../field/TextInputField";
import { FormController, FormControllerProps } from "./FormController";
import { FormListener, FormListenerProps } from "./FormListener";

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
  },
  onChange: (...args) => {
    action("change")(...args);
  },
};

export default {
  title: "Form/FormListener",
  component: FormListener,
};
