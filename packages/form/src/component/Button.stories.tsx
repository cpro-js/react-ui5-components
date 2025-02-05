import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Form/Component/Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "click",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

const Template: StoryFn<typeof Button> = (args) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action("onSubmit")(e);
      }}
    >
      <input type={"text"} defaultValue="change value and reset" />
      <Button {...args} />
    </form>
  );
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  children: "Button",
};

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  children: "Submit",
  type: "submit",
};

export const ResetButton = Template.bind({});
ResetButton.args = {
  children: "Reset",
  type: "reset",
};

const TemplateExternalForm: StoryFn<typeof Button> = (args) => {
  return (
    <>
      <form
        id={"my-form-id"}
        onSubmit={(e) => {
          e.preventDefault();
          action("onSubmit")(e);
        }}
      >
        <input type={"text"} defaultValue="change value and reset" />
      </form>
      <Button {...args} />
    </>
  );
};

export const ExternalDefaultButton = TemplateExternalForm.bind({});
ExternalDefaultButton.args = {
  children: "Button",
  form: "my-form-id",
};

export const ExternalSubmitButton = TemplateExternalForm.bind({});
ExternalSubmitButton.args = {
  children: "Submit",
  type: "submit",
  form: "my-form-id",
};

export const ExternalResetButton = TemplateExternalForm.bind({});
ExternalResetButton.args = {
  children: "Reset",
  type: "reset",
  form: "my-form-id",
};
