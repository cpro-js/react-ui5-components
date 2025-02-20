import { Meta, StoryFn } from "@storybook/react";

import { TextArea } from "./TextArea";

export default {
  title: "Component/TextArea",
  component: TextArea,
} satisfies Meta<typeof TextArea>;

const Template: StoryFn<typeof TextArea> = (args) => <TextArea {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  maxlength: 100,
  required: false,
};

export const Prefilled = Template.bind({});
Prefilled.args = {
  value: "Prefilled Text",
};
