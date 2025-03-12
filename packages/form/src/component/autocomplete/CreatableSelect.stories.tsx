import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { COUNTRIES } from "./AutoComplete-storyData";
import { CreatableSelect } from "./CreatableSelect";

export default {
  title: "Component/AutoComplete/CreatableSelect",
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

type Story = StoryObj<typeof CreatableSelect>;

export const Empty = {
  args: { value: undefined, items: [] },
} satisfies Story;

export const Standard = {
  args: { value: undefined, items: COUNTRIES },
} satisfies Story;
