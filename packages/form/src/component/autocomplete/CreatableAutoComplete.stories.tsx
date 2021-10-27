import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/refresh";
import "@ui5/webcomponents-icons/dist/search";
import "@ui5/webcomponents-icons/dist/sort";
import "@ui5/webcomponents-icons/dist/value-help.js";

import { Meta, Story } from "@storybook/react";
import { ValueState } from "@ui5/webcomponents-react";

import { COUNTRIES, SEARCH_COUNTRIES } from "./AutoComplete-storyData";
import {
  CreatableAutoComplete,
  CreatableAutoCompleteProps,
} from "./CreatableAutoComplete";
import { DefaultAutoCompleteOption } from "./internal/CoreAutocomplete";

const Template: Story<CreatableAutoCompleteProps<DefaultAutoCompleteOption>> =
  ({ ...props }) => {
    return <CreatableAutoComplete {...props} />;
  };

export const Standard = Template.bind({});
Standard.args = { value: undefined, loadItems: SEARCH_COUNTRIES };

export const Empty = Template.bind({});
Standard.args = { value: undefined };

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

export const RenderSuggestion = Template.bind({});
RenderSuggestion.args = {
  ...Standard.args,
  getItemProps: (country) => ({
    text: country.label,
    // @ts-ignore
    description: country.withUmlaut as string,
    icon: "add",
    // iconEnd: "info",
    info: "Infozzz",
    infoState: ValueState.Success,
  }),
};

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
} as Meta;
