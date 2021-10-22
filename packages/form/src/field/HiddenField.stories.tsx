import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { HiddenField, HiddenFieldProps } from "./HiddenField";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & HiddenFieldProps> = (
  args
) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <HiddenField {...props} name={"text"} />
      <FormViewer submittedValues={submittedValues} />
    </FormController>
  );
};

export const Empty = Template.bind({});
Empty.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = {
  initialValues: {
    text: "hello world",
  },
};

export default {
  title: "Form/Field/HiddenField",
  component: HiddenField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
