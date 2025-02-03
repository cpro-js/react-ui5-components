import "@ui5/webcomponents-icons/dist/add.js";

import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "./autocomplete/AutoComplete-storyData";
import { MultiAutoComplete, MultiAutoCompleteProps } from "./MultiAutoComplete";
import { DefaultAutoCompletOption } from "./MultiAutoCompleteModel";

const Template: StoryFn<typeof MultiAutoComplete<DefaultAutoCompletOption>> = (
  args
) => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };

  return (
    <MultiAutoComplete
      {...args}
      onSelectionChange={onSelect}
      style={{ width: "50%" }}
    />
  );
};

export const Standard = Template.bind({});
Standard.args = { values: [], onSearch: SEARCH_COUNTRIES };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  values: [COUNTRIES[0].value, COUNTRIES[4].value, COUNTRIES[5].value],
  initialSuggestions: [COUNTRIES[0], COUNTRIES[4], COUNTRIES[5]],
};

export const CustomLabelProp = Template.bind({});
CustomLabelProp.args = { ...Prefilled.args, itemLabel: "withUmlaut" };

export const CustomLabelFunction = Template.bind({});
CustomLabelFunction.args = {
  ...Prefilled.args,
  itemLabel: (country) => `ISO code: ${country.value}`,
};

export const CustomValueProp = Template.bind({});
CustomValueProp.args = { ...Prefilled.args, itemValue: "label" };

export const CustomValueFunction = Template.bind({});
CustomValueFunction.args = {
  ...Prefilled.args,
  itemValue: (country) => `VALUE_${country.label.toUpperCase()}`,
};

export const RenderValue = Template.bind({});
RenderValue.args = {
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
};

const meta = {
  title: "Form/Component/MultiAutoComplete",
  component: MultiAutoComplete,
} satisfies Meta<typeof MultiAutoComplete>;

export default meta;
