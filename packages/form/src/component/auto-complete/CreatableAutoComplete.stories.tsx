import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/refresh";
import "@ui5/webcomponents-icons/dist/search";
import "@ui5/webcomponents-icons/dist/sort";
import "@ui5/webcomponents-icons/dist/value-help.js";

import { Meta, Story } from "@storybook/react";

import { COUNTRIES } from "./AutoComplete-storyData";
import {
  CreatableAutocomplete,
  CreatableAutocompleteProps,
} from "./CreatableAutocomplete";

const Template: Story<CreatableAutocompleteProps> = ({ ...props }) => {
  return <CreatableAutocomplete {...props} />;
};

export const Empty = Template.bind({});
Empty.args = { value: undefined, items: [] };

export const Standard = Template.bind({});
Standard.args = { value: undefined, items: COUNTRIES };

export default {
  title: "form/component/CreatableAutoComplete",
  component: CreatableAutocomplete,
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
