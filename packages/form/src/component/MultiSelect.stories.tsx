import { ArgTypes, Meta, StoryFn, StoryObj } from "@storybook/react";

import { MultiSelect, MultiSelectItem } from "./MultiSelect";

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

export const Empty: Story = {
  args: {},
};

export const Standard: Story = {
  args: {
    items,
  },
};

export const WithValue: Story = {
  args: { ...Standard.args, value: ["2"] },
};

export const WithValueNumber: Story = {
  args: { ...Standard.args, value: [1] },
};

export const WithValueString: Story = {
  args: { ...Standard.args, value: ["1"] },
};

export const WithMultiValue: Story = {
  args: { ...Standard.args, value: [1, "1", "2"] },
};

/*const TemplateAlt: StoryFn<typeof MultiSelect<MultiSelectItemAlt, string>> = (
  args
) => {
  return <MultiSelect<MultiSelectItemAlt, string> {...args} />;
};*/

type StoryAlt = StoryObj<typeof MultiSelect<MultiSelectItemAlt, string>>;

export const CustomItemModel: StoryAlt = {
  args: {
    ...Standard.args,
    items,
    value: undefined,
    itemLabel: "alt",
    itemValue: "label",
  },
};
