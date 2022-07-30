import { Meta, Story } from "@storybook/react";

import { COUNTRIES } from "./AutoComplete-storyData";
import { CreatableSelect, CreatableSelectProps } from "./CreatableSelect";

const Template: Story<CreatableSelectProps> = ({ ...props }) => {
  return <CreatableSelect {...props} />;
};

export const Empty = Template.bind({});
Empty.args = { value: undefined, items: [] };

export const Standard = Template.bind({});
Standard.args = { value: undefined, items: COUNTRIES };

const meta: Meta = {
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
};
export default meta;
