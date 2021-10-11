import { Story } from "@storybook/react";

import { TextAreaProps } from "./TextArea";
import TextArea from "./TextArea";

export default {
  title: "Form/Component/TextArea",
  component: TextArea,
  argTypes: {
    onKeyPress: {
      action: "onKeyPress",
    },
    valueState: {
      options: ["None", "Warning", "Error", "Success", "Information"],
      control: { type: "radio" },
    },
  },
};

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  maxlength: 100,
  required: false,
  valueState: "None",
};

export const Prefilled = Template.bind({});
Prefilled.args = {
  value: "Prefilled Text",
  valueState: "None",
};
