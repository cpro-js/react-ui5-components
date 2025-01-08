import { StoryFn } from "@storybook/react";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";

import { TextAreaProps } from "./TextArea";
import { TextArea } from "./TextArea";

export default {
  title: "Form/Component/TextArea",
  component: TextArea,
  argTypes: {
    onKeyPress: {
      action: "onKeyPress",
    },
    valueState: {
      options: Object.values(ValueState),
      control: { type: "radio" },
    },
  },
};

const Template: StoryFn<TextAreaProps> = (args) => <TextArea {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  maxlength: 100,
  required: false,
  valueState: ValueState.None,
};

export const Prefilled = Template.bind({});
Prefilled.args = {
  value: "Prefilled Text",
  valueState: ValueState.None,
};
