import { Meta, StoryObj } from "@storybook/react";

import { TimePicker } from "./TimePicker";

export default {
  title: "Component/TimePicker",
  component: TimePicker,
} satisfies Meta<typeof TimePicker>;

type Story = StoryObj<typeof TimePicker>;

export const HHmm = {
  args: {
    formatPattern: "HH:mm",
  },
} satisfies Story;

export const HHmmss = {
  args: {
    formatPattern: "HH:mm:ss",
  },
} satisfies Story;

export const PrefilledHHmm = {
  args: {
    value: "04:07",
    formatPattern: "HH:mm",
  },
} satisfies Story;

export const PrefilledHHmmss = {
  args: {
    value: "14:07:30",
    formatPattern: "HH:mm:ss",
  },
} satisfies Story;
