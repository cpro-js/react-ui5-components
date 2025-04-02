import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { COUNTRIES, CountryItem } from "./autocomplete/AutoComplete-storyData";
import { Select, SelectItem } from "./Select";

export default {
  title: "Component/Select",
  component: Select,
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

/*const TemplateFn<typeof Select> = (args) => {
  return <Select {...args} />;
};*/

export const Standard = {
  args: {
    items,
  },
} satisfies Story;

export const Empty = {
  args: {},
} satisfies Story;

export const WithEmptyOption = {
  args: { ...Standard.args, addEmptyOption: true },
} satisfies Story;

export const WithValue = {
  args: { ...Standard.args, value: "2" },
} satisfies Story;

export const WithValueNumber = {
  args: { ...Standard.args, value: 1 },
} satisfies Story;

export const WithValueString = {
  args: { ...Standard.args, value: "1" },
} satisfies Story;

type StoryAlt = StoryObj<typeof Select<SelectItemAlt, string>>;

export const CustomItemModelAlt = {
  args: {
    ...Standard.args,
    items,
    value: undefined,
    itemLabel: "alt",
    itemValue: "label",
  },
} satisfies StoryAlt;

type StoryCountry = StoryObj<typeof Select<CountryItem, string>>;

export const AdditionalTextCountry = {
  args: {
    ...Standard.args,
    items: COUNTRIES,
    value: undefined,
    itemLabel: "label",
    itemValue: "value",
    itemAdditionalText: "value",
  },
} satisfies StoryCountry;
