import { Meta, StoryFn } from "@storybook/react";

import { MultiSelect, MultiSelectItem, MultiSelectProps } from "./MultiSelect";

const Template: StoryFn<MultiSelectProps> = (args) => {
  return <MultiSelect {...args} />;
};

interface MultiSelectItemAlt extends MultiSelectItem {
  alt: string;
}

const items: Array<MultiSelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
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

const TemplateAlt: StoryFn<MultiSelectProps<MultiSelectItemAlt, string>> = (
  args
) => {
  return <MultiSelect<MultiSelectItemAlt, string> {...args} />;
};

export const CustomItemModel = TemplateAlt.bind({});
CustomItemModel.args = {
  ...Standard.args,
  items,
  value: undefined,
  itemLabel: "alt",
  itemValue: "label",
};

const meta: Meta = {
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

export default meta;
