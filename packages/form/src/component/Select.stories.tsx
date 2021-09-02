import { Story } from "@storybook/react";

import { Select, SelectItem, SelectProps } from "./Select";

const Template: Story<SelectProps> = (args) => {
  return <Select {...args} />;
};

const items: Array<SelectItem> = [
  { value: 1, label: "Test 1 Number" },
  { value: "1", label: "Test 1 String" },
  { value: "2", label: "Test 2" },
  { value: "3", label: "Test 3" },
  { value: "4", label: "Test 4" },
];

export const Empty = Template.bind({});
Empty.args = {};

export const Standard = Template.bind({});
Standard.args = {
  items,
};

export const WithEmptyOption = Template.bind({});
WithEmptyOption.args = { ...Standard.args, addEmptyOption: true };

export const WithValue = Template.bind({});
WithValue.args = { ...Standard.args, value: "2" };

export const WithValueNumber = Template.bind({});
WithValueNumber.args = { ...Standard.args, value: 1 };

export const WithValueString = Template.bind({});
WithValueString.args = { ...Standard.args, value: "1" };

export default {
  title: "Form/Component/Select",
  component: Select,
  argTypes: {
    onSelectionChange: {
      action: "selection-change",
    },
    onInput: {
      action: "input",
    },
    onChange: {
      action: "change",
    },
  },
};
