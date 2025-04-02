import "@ui5/webcomponents-icons/dist/value-help.js";

import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Icon } from "@ui5/webcomponents-react";

import { TextInput } from "./TextInput";

export default {
  title: "Component/TextInput",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof TextInput>;

export const Standard = {
  args: {},
} satisfies Story;

export const Prefilled = {
  args: { ...Standard.args, value: "test" },
} satisfies Story;

export const WithIcon = {
  args: {
    ...Standard.args,
    icon: <Icon name="value-help" mode="Interactive" onClick={console.log} />,
  },
} satisfies Story;
