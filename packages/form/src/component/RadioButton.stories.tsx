import { Meta, StoryObj } from "@storybook/react";

import { RadioButton } from "./RadioButton";

export default {
  title: "Component/RadioButton",
  component: RadioButton,
} satisfies Meta<typeof RadioButton>;

type Story = StoryObj<typeof RadioButton>;

export const Standard = {
  args: {
    name: "test",
    text: "Test",
  },
} satisfies Story;

export const Checked = {
  args: {
    ...Standard.args,
    checked: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Standard.args,
    disabled: true,
  },
} satisfies Story;

export const DisabledAndChecked = {
  args: {
    ...Standard.args,
    disabled: true,
    checked: true,
  },
} satisfies Story;
