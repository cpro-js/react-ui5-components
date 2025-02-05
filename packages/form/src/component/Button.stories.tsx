import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "Form/Component/Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "click",
    },
  },
} satisfies Meta<typeof Button>;
const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args} />;
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: "Button",
};

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  children: "Submit",
  type: "submit",
  onClick: action("submit-clicked"),
};

export const ResetButton = Template.bind({});
ResetButton.args = {
  children: "Reset",
  type: "reset",
  onClick: action("reset-clicked"),
};

const TemplateParentForm: StoryFn<typeof Button> = (args) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action("onSubmit")(e);
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
  );
};

export const ParentForm = TemplateParentForm.bind({});
ParentForm.args = {};

const TemplateExternalForm: StoryFn<typeof Button> = (args) => {
  return (
    <>
      <form
        id="my-form-id"
        onSubmit={(e) => {
          e.preventDefault();
          action("onSubmit")(e);
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
  );
};

export const ExternalForm = TemplateExternalForm.bind({});
ExternalForm.args = {};
