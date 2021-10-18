import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../FormController";
import { FormViewer } from "./FormViewer";
import { HiddenField, HiddenFieldProps } from "./HiddenField";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & HiddenFieldProps> = (
  args,
  context
) => {
  const { initialValues, onSubmit, ...props } = args;

  return (
    <FormViewer
      component={<HiddenField {...props} name={"text"} />}
      initialValues={initialValues}
      storyName={context.name}
      //@ts-ignore
      onSubmitAction={onSubmit}
    />
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
