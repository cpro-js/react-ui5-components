import "@ui5/webcomponents-icons/dist/value-help.js";
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/search";
import "@ui5/webcomponents-icons/dist/sort";
import "@ui5/webcomponents-icons/dist/refresh";

import { Meta, Story, StoryContext } from "@storybook/react";
import { ValueState } from "@ui5/webcomponents-react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "./auto-complete/AutoComplete-storyData";
import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { DefaultAutoCompleteOption } from "./AutoCompleteModel";

const Template: Story<AutoCompleteProps<DefaultAutoCompleteOption>> = ({
  value,
  ...props
}) => {
  return <AutoComplete {...props} value={value} />;
};

export const Standard = Template.bind({});
Standard.args = { value: undefined, onSearch: SEARCH_COUNTRIES };

export const Empty = Template.bind({});
Standard.args = { value: undefined };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  value: COUNTRIES[1].value,
  initialSuggestions: [COUNTRIES[1]],
};

export const PrefilledWithValueOnly = Template.bind({});
PrefilledWithValueOnly.args = {
  ...Standard.args,
  value: COUNTRIES[1].value,
};

export const CustomLabelProp = Template.bind({});
CustomLabelProp.args = { ...Prefilled.args, optionLabel: "withUmlaut" };

export const CustomLabelFunction = Template.bind({});
CustomLabelFunction.args = {
  ...Prefilled.args,
  optionLabel: (country) => `ISO code: ${country.value} => ${country.label}`,
};

export const CustomValueProp = Template.bind({});
CustomValueProp.args = { ...Prefilled.args, optionValue: "label" };

export const CustomValueFunction = Template.bind({});
CustomValueFunction.args = {
  ...Prefilled.args,
  value: COUNTRIES[1].value,
  optionValue: (country) => `${country.label} (${country.value})`,
};

export const RenderSuggestion = Template.bind({});
RenderSuggestion.args = {
  ...Standard.args,
  suggestionProps: (country) => ({
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
  title: "form/component/AutoComplete",
  component: AutoComplete,
} as Meta;
