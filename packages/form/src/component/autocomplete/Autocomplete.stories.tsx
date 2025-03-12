import "@ui5/webcomponents-icons/dist/add.js";

import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { AutoComplete } from "./AutoComplete";
import {
  COUNTRIES,
  CountryItem,
  SEARCH_COUNTRIES,
} from "./AutoComplete-storyData";

export default {
  title: "Component/AutoComplete/AutoComplete",
  component: AutoComplete,
  argTypes: {
    onInputChange: {
      action: "onInputChange",
    },
    onValueChange: {
      action: "onValueChange",
    },
  },
} satisfies Meta<typeof AutoComplete>;

type Story = StoryObj<typeof AutoComplete<CountryItem>>;

export const Standard = {
  args: { value: undefined, loadItems: SEARCH_COUNTRIES },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Standard.args,
    value: COUNTRIES[1].value,
    initialItems: [COUNTRIES[1]],
  },
} satisfies Story;

export const PrefilledWithValueOnly = {
  args: {
    ...Standard.args,
    value: COUNTRIES[1].value,
  },
} satisfies Story;

export const MinCharacters = {
  args: { ...Standard.args, minCharsForSearch: 3 },
} satisfies Story;

export const DontForceSelection = {
  args: { ...Standard.args, forceSelection: false },
} satisfies Story;

export const CustomLabelProp = {
  args: { ...Prefilled.args, itemLabel: "withUmlaut" },
} satisfies Story;

export const CustomLabelFunction = {
  args: {
    ...Prefilled.args,
    itemLabel: (country) => `ISO code: ${country.value} => ${country.label}`,
  },
} satisfies Story;

export const CustomValueProp = {
  args: { ...Prefilled.args, itemValue: "label" },
} satisfies Story;

export const CustomValueFunction = {
  args: {
    ...Prefilled.args,
    value: COUNTRIES[1].value,
    itemValue: (country) => `${country.label} (${country.value})`,
  },
} satisfies Story;
