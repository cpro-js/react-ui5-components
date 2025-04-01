import { StoryFn } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { RadioButtonField, RadioButtonFieldProps } from "./RadioButtonField";
import { RadioButtonFieldGroup } from "./RadioButtonFieldGroup";

interface FormData {
  value?: string;
}

const Template: StoryFn<
  FormControllerProps<FormData> & RadioButtonFieldProps<FormData, "value">
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });

  return (
    <FormController<FormData> {...{ initialValues, onSubmit: handleSubmit }}>
      <RadioButtonFieldGroup {...props} name="value">
        <RadioButtonField value="cake" text={"Cake"} />
        <RadioButtonField value="waffles" text={"Waffles"} />
        <RadioButtonField value="burger" text={"Burger"} />
      </RadioButtonFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>
  );
};

export const Empty = Template.bind({});
Empty.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Empty.args,
  initialValues: {
    value: "waffles",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Prefilled.args,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Prefilled.args,
  readonly: true,
};

export const ValidationRequired = Template.bind({});
ValidationRequired.args = {
  required: true,
};

export default {
  title: "Form/Field/RadioButtonFieldGroup",
  component: RadioButtonFieldGroup,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
