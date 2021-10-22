import { Story } from "@storybook/react";
import { FormEvent, useState } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormViewer } from "./FormViewer";
import { HiddenField, HiddenFieldProps } from "./HiddenField";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & HiddenFieldProps> = (
  args
) => {
  const { initialValues, ...props } = args;
  const onSubmitAction = args.onSubmit;

  const [submittedValues, setSubmittedValues] = useState({});

  const onSubmit = (values: FormData & FormEvent<HTMLElement>) => {
    setSubmittedValues(values);
    onSubmitAction(values);
  };

  const getSubmittedValues = () => {
    return submittedValues;
  };

  return (
    <FormController<FormData & FormEvent<HTMLElement>>
      {...{ initialValues, onSubmit }}
    >
      <HiddenField {...props} name={"text"} />
      <FormViewer getSubmittedValues={getSubmittedValues} />
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
