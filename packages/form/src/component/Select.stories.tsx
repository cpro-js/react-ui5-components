import { StoryFn } from "@storybook/react";

import { COUNTRIES, CountryItem } from "./autocomplete/AutoComplete-storyData";
import { Select, SelectItem, SelectProps } from "./Select";

export interface SelectItemAlt extends SelectItem {
  alt: string;
}

const items: Array<SelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
];

const Template: StoryFn<SelectProps> = (args) => {
  return <Select {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
  items,
};

export const Empty = Template.bind({});
Empty.args = {};

export const WithEmptyOption = Template.bind({});
WithEmptyOption.args = { ...Standard.args, addEmptyOption: true };

export const WithValue = Template.bind({});
WithValue.args = { ...Standard.args, value: "2" };

export const WithValueNumber = Template.bind({});
WithValueNumber.args = { ...Standard.args, value: 1 };

export const WithValueString = Template.bind({});
WithValueString.args = { ...Standard.args, value: "1" };

const TemplateAlt: StoryFn<SelectProps<SelectItemAlt, string>> = (args) => {
  return <Select<SelectItemAlt, string> {...args} />;
};

export const CustomItemModel = TemplateAlt.bind({});
CustomItemModel.args = {
  ...Standard.args,
  items,
  value: undefined,
  itemLabel: "alt",
  itemValue: "label",
};

const TemplateCountry: StoryFn<SelectProps<CountryItem, string>> = (args) => {
  return <Select<CountryItem, string> {...args} />;
};

export const AdditionalText = TemplateCountry.bind({});
AdditionalText.args = {
  ...Standard.args,
  items: COUNTRIES,
  value: undefined,
  itemLabel: "label",
  itemValue: "value",
  itemAdditionalText: "value",
};

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
