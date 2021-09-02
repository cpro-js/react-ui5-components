import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../FormController";
import { TextInputField, TextInputFieldProps } from "./TextInputField";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & TextInputFieldProps> = (
  args
) => {
  const { initialValues, onSubmit, ...props } = args;

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <TextInputField {...props} name={"text"} />
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

export const Disabled = Template.bind({});
Disabled.args = {
  ...Prefilled.args,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Prefilled.args,
  readonly: true,
};

export const ValidationRequired = Template.bind({});
ValidationRequired.args = {
  ...Empty.args,
  required: true,
};

export const ValidationMinLength = Template.bind({});
ValidationMinLength.args = {
  ...Empty.args,
  minLength: 4,
};

export const ValidationMinMaxLength = Template.bind({});
ValidationMinMaxLength.args = {
  ...Empty.args,
  minLength: 4,
  maxLength: 10,
};

export default {
  title: "Form/Field/TextInputField",
  component: TextInputField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
