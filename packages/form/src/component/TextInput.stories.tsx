import "@ui5/webcomponents-icons/dist/value-help.js";

import { StoryFn } from "@storybook/react";
import { Icon } from "@ui5/webcomponents-react";

import { TextInput, TextInputProps } from "./TextInput";

const Template: StoryFn<TextInputProps> = (args) => {
  return <TextInput {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: "test" };

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Standard.args,
  icon: <Icon name="value-help" mode="Interactive" onClick={console.log} />,
};

export default {
  title: "Form/Component/TextInput",
  component: TextInput,
  argTypes: {
    onKeyPress: {
      action: "onKeyPress",
    },
    onChange: {
      action: "onChange",
    },
  },
};
