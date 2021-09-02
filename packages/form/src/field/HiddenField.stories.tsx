import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../FormController";
import { HiddenField, HiddenFieldProps } from "./HiddenField";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & HiddenFieldProps> = (
  args
) => {
  const { initialValues, onSubmit, ...props } = args;

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <HiddenField {...props} name={"text"} />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </FormController>
  );
};

export const Empty = Template.bind({});
Empty.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = {
  initialValues: {
    text: "hello world",
  },
};

export default {
  title: "Form/Field/HiddenField",
  component: HiddenField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
