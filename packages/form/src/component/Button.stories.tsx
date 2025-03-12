import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "Component/Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "click",
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const DefaultButton = {
  args: {
    children: "Button",
  },
} satisfies Story;

export const SubmitButton = {
  args: {
    children: "Submit",
    type: "submit",
    onClick: action("submit-clicked"),
  },
} satisfies Story;

export const ResetButton = {
  args: {
    children: "Reset",
    type: "reset",
    onClick: action("reset-clicked"),
  },
} satisfies Story;

const ParentForm = {
  render: (args) => (
    <form
      style={{ border: "1px solid black", padding: 20, margin: 20 }}
      onSubmit={(e) => {
        e.preventDefault();
        action("submit-clicked")(e);
      }}
      onReset={(e) => {
        action("reset-clicked")(e);
      }}
    >
      <input type="text" defaultValue="change value and reset" />
      <Button {...args} type="button">
        Button
      </Button>
      <Button {...args} type="submit">
        Submit
      </Button>
      <Button {...args} type="reset">
        Reset
      </Button>
    </form>
  ),
} satisfies Story;

export const InsideHtmlForm = {
  ...ParentForm,
  args: {},
} satisfies Story;

const ExternalForm = {
  render: (args) => (
    <>
      <form
        id="my-form-id"
        style={{ border: "1px solid black", padding: 20, margin: 20 }}
        onSubmit={(e) => {
          e.preventDefault();
          action("onSubmit")(e);
        }}
        onReset={(e) => {
          action("onReset")(e);
        }}
      >
        <input type="text" defaultValue="change value and reset" />
      </form>
      <Button {...args} form="my-form-id" type="button">
        Button
      </Button>
      <Button {...args} form="my-form-id" type="submit">
        Submit
      </Button>
      <Button {...args} form="my-form-id" type="reset">
        Reset
      </Button>
    </>
  ),
} satisfies Story;

export const ExternalHtmlForm = {
  ...ExternalForm,
  args: {},
} satisfies Story;
