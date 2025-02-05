import { Meta, StoryFn } from "@storybook/react";

import { COUNTRIES } from "./AutoComplete-storyData";
import { CreatableSelect } from "./CreatableSelect";

export default {
  title: "form/component/AutoComplete/CreatableSelect",
  component: CreatableSelect,
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
} satisfies Meta<typeof CreatableSelect>;

const Template: StoryFn<typeof CreatableSelect> = ({ ...props }) => {
  return <CreatableSelect {...props} />;
};

export const Empty = Template.bind({});
Empty.args = { value: undefined, items: [] };

export const Standard = Template.bind({});
Standard.args = { value: undefined, items: COUNTRIES };
