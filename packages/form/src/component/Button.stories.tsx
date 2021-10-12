import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { Button, ButtonProps } from "./Button";

const Template: Story<{ buttons: Array<ButtonProps> }> = ({ buttons }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action("onSubmit")(e);
      }}
    >
      <input type={"text"} defaultValue="change value and reset" />
      {buttons.map((props, index) => (
        <Button key={index} {...props} />
      ))}
    </form>
  );
};

export const ParentForm = Template.bind({});
ParentForm.args = {
  buttons: [
    {
      children: "Button",
    },
    {
      children: "Submit",
      type: "submit",
    },
    {
      children: "Reset",
      type: "reset",
    },
  ],
};

const TemplateExternalForm: Story<{ buttons: Array<ButtonProps> }> = ({
  buttons,
}) => {
  return (
    <>
      <form
        id={"my-form-id"}
        onSubmit={(e) => {
          e.preventDefault();
          action("onSubmit")(e);
        }}
      />
      <input type={"text"} defaultValue="change value and reset" />
      {buttons.map((props, index) => (
        <Button key={index} {...props} />
      ))}
    </>
  );
};

export const ExternalForm = TemplateExternalForm.bind({});
ExternalForm.args = {
  buttons: [
    {
      children: "Button",
      form: "my-form-id",
    },
    {
      form: "my-form-id",
      children: "Submit",
      type: "submit",
    },
    {
      form: "my-form-id",
      children: "Reset",
      type: "reset",
    },
  ],
};

export default {
  title: "Form/Component/Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "click",
    },
  },
};
