import "@ui5/webcomponents-icons/dist/value-help.js";

import { Story } from "@storybook/react";
import { Icon } from "@ui5/webcomponents-react";

import { TextInput, TextInputProps } from "./TextInput";

const Template: Story<TextInputProps> = (args) => {
  return <TextInput {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: "test" };

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Standard.args,
  icon: <Icon name="value-help" interactive onClick={console.log} />,
};

export default {
  title: "Form/Component/TextInput",
  component: TextInput,
};
