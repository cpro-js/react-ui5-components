import "@ui5/webcomponents-icons/dist/add.js";

import { Meta, StoryObj } from "@storybook/react";

import {
  COUNTRIES,
  CountryItem,
  SEARCH_COUNTRIES,
} from "./AutoComplete-storyData";
import { CreatableAutoComplete } from "./CreatableAutoComplete";

export default {
  title: "Component/AutoComplete/CreatableAutocomplete",
  component: CreatableAutoComplete,
  argTypes: {
    onValueCreate: {
      action: "onValueCreate",
    },
    onInputChange: {
      action: "onInputChange",
    },
    onValueChange: {
      action: "onValueChange",
    },
  },
} satisfies Meta<typeof CreatableAutoComplete>;

type Story = StoryObj<typeof CreatableAutoComplete<CountryItem>>;

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

// export const RenderSuggestion = {}
// RenderSuggestion.args = {
//   ...Standard.args,
//   itemProps: (country) => ({
//     text: country.label,
//     // @ts-ignore
//     description: country.withUmlaut as string,
//     icon: "add",
//     // endIcon: "info",
//     info: "Infozzz",
//     infoState: ValueState.Positive,
//   }),
// } satisfies Story;
