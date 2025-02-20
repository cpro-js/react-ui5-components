import { action } from "@storybook/addon-actions";
import { Decorator, Meta, StoryFn, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

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

export const Standard: Story = {
  args: {
    name: DEFAULT_NAME,
  },
};

export const Checked: Story = {
  args: {
    ...Standard.args,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    ...Standard.args,
    indeterminate: true,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Standard.args,
    disabled: true,
  },
};

export const DisabledAndChecked: Story = {
  args: {
    ...Standard.args,
    disabled: true,
    checked: true,
  },
};

export const HtmlForm: Story = {
  args: {
    ...Standard.args,
  },
  decorators: [FormDecorator],
  //alternative with render
  /*render: (args) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
        const toLog = `Submitted value for key [${DEFAULT_NAME}]: ${data}`;
        action("onSubmit")(toLog);
      }}
    >
      <Checkbox {...args} />
      <button>Submit</button>
    </form>
  ),*/
};

export const HtmlFormWithValue: Story = {
  ...HtmlForm,
  args: {
    ...HtmlForm.args,
    value: "my-value",
  },
};
