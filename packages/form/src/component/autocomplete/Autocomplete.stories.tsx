import "@ui5/webcomponents-icons/dist/add.js";

import { Meta, StoryFn } from "@storybook/react";

import { AutoComplete } from "./AutoComplete";
import {
  COUNTRIES,
  CountryItem,
  SEARCH_COUNTRIES,
} from "./AutoComplete-storyData";

export default {
  title: "form/component/AutoComplete/AutoComplete",
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

const Template: StoryFn<typeof AutoComplete<CountryItem>> = ({ ...props }) => {
  return <AutoComplete {...props} />;
};

export const Standard = Template.bind({});
Standard.args = { value: undefined, loadItems: SEARCH_COUNTRIES };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  value: COUNTRIES[1].value,
  initialItems: [COUNTRIES[1]],
};

export const PrefilledWithValueOnly = Template.bind({});
PrefilledWithValueOnly.args = {
  ...Standard.args,
  value: COUNTRIES[1].value,
};

export const MinCharacters = Template.bind({});
MinCharacters.args = { ...Standard.args, minCharsForSearch: 3 };

export const DontForceSelection = Template.bind({});
DontForceSelection.args = { ...Standard.args, forceSelection: false };

export const CustomLabelProp = Template.bind({});
CustomLabelProp.args = { ...Prefilled.args, itemLabel: "withUmlaut" };

export const CustomLabelFunction = Template.bind({});
CustomLabelFunction.args = {
  ...Prefilled.args,
  itemLabel: (country) => `ISO code: ${country.value} => ${country.label}`,
};

export const CustomValueProp = Template.bind({});
CustomValueProp.args = { ...Prefilled.args, itemValue: "label" };

export const CustomValueFunction = Template.bind({});
CustomValueFunction.args = {
  ...Prefilled.args,
  value: COUNTRIES[1].value,
  itemValue: (country) => `${country.label} (${country.value})`,
};
