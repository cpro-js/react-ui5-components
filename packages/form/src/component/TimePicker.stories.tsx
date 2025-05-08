import { Meta, StoryObj } from "@storybook/react";

import { TimePicker } from "./TimePicker";

export default {
  title: "Component/TimePicker",
  component: TimePicker,
} satisfies Meta<typeof TimePicker>;

type Story = StoryObj<typeof TimePicker>;

export const Standard = {
  args: {},
} satisfies Story;
