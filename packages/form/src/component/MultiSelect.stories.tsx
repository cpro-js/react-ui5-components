import { Story } from "@storybook/react";

import { MultiSelect, MultiSelectItem, MultiSelectProps } from "./MultiSelect";

const Template: Story<MultiSelectProps> = (args) => {
  return <MultiSelect {...args} />;
};

const items: Array<MultiSelectItem> = [
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

export const WithValue = Template.bind({});
WithValue.args = { ...Standard.args, value: ["2"] };

export const WithValueNumber = Template.bind({});
WithValueNumber.args = { ...Standard.args, value: [1] };

export const WithValueString = Template.bind({});
WithValueString.args = { ...Standard.args, value: ["1"] };

export const WithMultiValue = Template.bind({});
WithMultiValue.args = { ...Standard.args, value: [1, "1", "2"] };

export const WithItemLabel = Template.bind({});
WithItemLabel.args = { ...Standard.args, itemLabel: "value" };

export const WithItemValue = Template.bind({});
WithItemValue.args = { ...Standard.args, itemValue: "label" };

export default {
  title: "Form/Component/MultiSelect",
  component: MultiSelect,
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
