import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { COUNTRIES, CountryItem } from "./autocomplete/AutoComplete-storyData";
import { Select, SelectItem } from "./Select";

export default {
  title: "Component/Select",
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
} satisfies Meta<typeof Select>;

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

type Story = StoryObj<typeof Select>;

/*const Template: StoryFn<typeof Select> = (args) => {
  return <Select {...args} />;
};*/

export const Standard: Story = {
  args: {
    items,
  },
};

export const Empty: Story = {
  args: {},
};

export const WithEmptyOption: Story = {
  args: { ...Standard.args, addEmptyOption: true },
};

export const WithValue: Story = {
  args: { ...Standard.args, value: "2" },
};

export const WithValueNumber: Story = {
  args: { ...Standard.args, value: 1 },
};

export const WithValueString: Story = {
  args: { ...Standard.args, value: "1" },
};

/*const TemplateAlt: StoryFn<typeof Select<SelectItemAlt, string>> = (args) => {
  return <Select<SelectItemAlt, string> {...args} />;
};*/

type StoryAlt = StoryObj<typeof Select<SelectItemAlt, string>>;

export const CustomItemModel: StoryAlt = {
  args: {
    ...Standard.args,
    items,
    value: undefined,
    itemLabel: "alt",
    itemValue: "label",
  },
};

type StoryCountry = StoryObj<typeof Select<CountryItem, string>>;

export const AdditionalText: StoryCountry = {
  args: {
    ...Standard.args,
    items: COUNTRIES,
    value: undefined,
    itemLabel: "label",
    itemValue: "value",
    itemAdditionalText: "value",
  },
};
