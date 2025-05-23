import "@ui5/webcomponents-icons/dist/add.js";

import { action } from "@storybook/addon-actions";
import { Decorator, Meta, StoryFn, StoryObj } from "@storybook/react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "./autocomplete/AutoComplete-storyData";
import { MultiAutoComplete } from "./MultiAutoComplete";
import { DefaultAutoCompletOption } from "./MultiAutoCompleteModel";

export default {
  title: "Component/MultiAutoComplete",
  component: MultiAutoComplete,
} satisfies Meta<typeof MultiAutoComplete>;

type Story = StoryObj<typeof MultiAutoComplete<DefaultAutoCompletOption>>;

export const Standard = {
  args: {
    values: [],
    onSearch: SEARCH_COUNTRIES,
    style: { width: "50%" },
  },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Standard.args,
    values: [COUNTRIES[0].value, COUNTRIES[4].value, COUNTRIES[5].value],
    initialSuggestions: [COUNTRIES[0], COUNTRIES[4], COUNTRIES[5]],
  },
} satisfies Story;

export const CustomLabelProp = {
  args: { ...Prefilled.args, itemLabel: "withUmlaut" },
} satisfies Story;

export const CustomLabelFunction = {
  args: {
    ...Prefilled.args,
    itemLabel: (country) => `ISO code: ${country.value}`,
  },
} satisfies Story;

export const CustomValueProp = {
  args: { ...Prefilled.args, itemValue: "label" },
} satisfies Story;

export const CustomValueFunction = {
  args: {
    ...Prefilled.args,
    itemValue: (country) => `VALUE_${country.label.toUpperCase()}`,
  },
} satisfies Story;

export const RenderValue = {
  args: {
    ...Prefilled.args,
    renderValue: (country) => {
      return {
        text: country.label + " - custom !!!",
        // value: `VALUE_${country.label.toUpperCase()}`,
        // closeIcon: <Icon name="refresh" />,
        className: "test-class-name",
        // selected: true,
      };
    },
  },
} satisfies Story;
