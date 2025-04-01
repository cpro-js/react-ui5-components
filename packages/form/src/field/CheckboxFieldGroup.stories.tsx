import { StoryFn } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { CheckboxField } from "./CheckboxField";
import {
  CheckboxFieldGroup,
  CheckboxFieldGroupProps,
} from "./CheckboxFieldGroup";
import { FormViewer, useFormViewer } from "./FormViewer";

interface FormData {
  value?: Array<string>;
}

const Template: StoryFn<
  FormControllerProps<FormData> & CheckboxFieldGroupProps<FormData, "value">
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });

  return (
    <FormController<FormData> {...{ initialValues, onSubmit: handleSubmit }}>
      <CheckboxFieldGroup {...props} name="value">
        <CheckboxField value="cake" text={"Cake"} />
        <CheckboxField value="waffles" text={"Waffles"} />
        <CheckboxField value="burger" text={"Burger"} />
      </CheckboxFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>
  );
};

export const Empty = Template.bind({});
Empty.args = {};

export const PrefilledSingle = Template.bind({});
PrefilledSingle.args = {
  ...Empty.args,
  initialValues: {
    value: ["waffles"],
  },
};

export const PrefilledMultiple = Template.bind({});
PrefilledMultiple.args = {
  ...Empty.args,
  initialValues: {
    value: ["waffles", "cake"],
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...PrefilledSingle.args,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...PrefilledSingle.args,
  readonly: true,
};

export const ValidationRequired = Template.bind({});
ValidationRequired.args = {
  required: true,
};

export default {
  title: "Form/Field/CheckboxFieldGroup",
  component: CheckboxFieldGroup,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
