import { Meta, Story } from "@storybook/react";

import { Checkbox, CheckboxProps } from "./Checkbox";

const Template: Story<CheckboxProps & { form?: boolean }> = ({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }

  return (
    <form>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  name: "test",
};

export const Checked = Template.bind({});
Checked.args = {
  ...Standard.args,
  checked: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ...Standard.args,
  indeterminate: true,
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Standard.args,
  disabled: true,
};

export const DisabledAndChecked = Template.bind({});
DisabledAndChecked.args = {
  ...Standard.args,
  disabled: true,
  checked: true,
};

export const HtmlForm = Template.bind({});
HtmlForm.args = {
  ...Standard.args,
  form: true,
};

export const HtmlFormWithValue = Template.bind({});
HtmlFormWithValue.args = {
  ...HtmlForm.args,
  value: "my-value",
};

const meta: Meta = {
  title: "Form/Component/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: {
      action: "change",
    },
  },
};

export default meta;
