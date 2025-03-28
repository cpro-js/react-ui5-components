import "@ui5/webcomponents-icons/dist/add.js";

import { Meta, StoryFn } from "@storybook/react";

import {
  COUNTRIES,
  CountryItem,
  SEARCH_COUNTRIES,
} from "./AutoComplete-storyData";
import { CreatableAutoComplete } from "./CreatableAutoComplete";

export default {
  title: "form/component/AutoComplete/CreatableAutocomplete",
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

const Template: StoryFn<typeof CreatableAutoComplete<CountryItem>> = (args) => {
  return <CreatableAutoComplete {...args} />;
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

// export const RenderSuggestion = Template.bind({});
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
// };
