import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { TextArea } from "./TextArea";

export default {
  title: "Component/TextArea",
  component: TextArea,
} satisfies Meta<typeof TextArea>;

type Story = StoryObj<typeof TextArea>;

export const Standard = {
  args: {
    maxlength: 100,
    required: false,
  },
} satisfies Story;

export const Prefilled = {
  args: {
    value: "Prefilled Text",
  },
} satisfies Story;
