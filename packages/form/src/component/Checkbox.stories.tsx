import { action } from "@storybook/addon-actions";
import { Decorator, Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

export default {
  title: "Component/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: {
      action: "change",
    },
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

const DEFAULT_NAME = "test";

const FormDecorator: Decorator = (Story) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
      const toLog = `Submitted value for key [${DEFAULT_NAME}]: ${data}`;
      action("onSubmit")(toLog);
    }}
  >
    <Story />
    <button>Submit</button>
  </form>
);

export const Standard = {
  args: {
    name: DEFAULT_NAME,
  },
} satisfies Story;

export const Checked = {
  args: {
    ...Standard.args,
    checked: true,
  },
} satisfies Story;

export const Indeterminate = {
  args: {
    ...Standard.args,
    indeterminate: true,
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

export const HtmlForm = {
  args: {
    ...Standard.args,
  },
  decorators: [FormDecorator],
} satisfies Story;

export const HtmlFormWithValue = {
  ...HtmlForm,
  args: {
    ...HtmlForm.args,
    value: "my-value",
  },
} satisfies Story;
