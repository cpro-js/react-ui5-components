import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { COUNTRIES } from "./AutoComplete-storyData";
import { CreatableSelect } from "./CreatableSelect";

export default {
  title: "Component/AutoComplete/CreatableSelect",
  component: CreatableSelect,
} satisfies Meta<typeof CreatableSelect>;

type Story = StoryObj<typeof CreatableSelect>;

export const Empty = {
  args: { value: undefined, items: [] },
} satisfies Story;

export const Standard = {
  args: { value: undefined, items: COUNTRIES },
} satisfies Story;
