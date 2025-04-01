import { Meta, StoryFn } from "@storybook/react";
import { ComponentProps } from "react";

import { RadioButton } from "./RadioButton";

export default {
  title: "Form/Component/RadioButton",
  component: RadioButton,
} satisfies Meta<typeof RadioButton>;

const DEFAULT_NAME = "test";

const Template: StoryFn<ComponentProps<typeof RadioButton>> = (args) => {
  return <RadioButton {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
  name: DEFAULT_NAME,
  text: "Test",
};

export const Checked = Template.bind({});
Checked.args = {
  ...Standard.args,
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
