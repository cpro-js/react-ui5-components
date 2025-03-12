import { ArgTypes, Meta, StoryFn, StoryObj } from "@storybook/react";

import { MultiSelect, MultiSelectItem } from "./MultiSelect";

export default {
  title: "Component/MultiSelect",
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
} satisfies Meta<typeof MultiSelect>;

type Story = StoryObj<typeof MultiSelect>;

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

export const Empty = {
  args: {},
} satisfies Story;

export const Standard = {
  args: {
    items,
  },
} satisfies Story;

export const WithValue = {
  args: { ...Standard.args, value: ["2"] },
} satisfies Story;

export const WithValueNumber = {
  args: { ...Standard.args, value: [1] },
} satisfies Story;

export const WithValueString = {
  args: { ...Standard.args, value: ["1"] },
} satisfies Story;

export const WithMultiValue = {
  args: { ...Standard.args, value: [1, "1", "2"] },
} satisfies Story;

type StoryAlt = StoryObj<typeof MultiSelect<MultiSelectItemAlt, string>>;

export const CustomItemModelAlt = {
  args: {
    ...Standard.args,
    items,
    value: undefined,
    itemLabel: "alt",
    itemValue: "label",
  },
} satisfies StoryAlt;
