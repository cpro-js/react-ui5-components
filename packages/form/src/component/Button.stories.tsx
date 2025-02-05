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
  );
};

export const InsideHtmlForm = TemplateParentForm.bind({});
InsideHtmlForm.args = {};

const TemplateExternalForm: StoryFn<typeof Button> = (args) => {
  return (
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
  );
};

export const ExternalHtmlForm = TemplateExternalForm.bind({});
ExternalHtmlForm.args = {};
