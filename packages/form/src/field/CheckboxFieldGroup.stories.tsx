import { Story } from "@storybook/react";
import { FormEvent, useState } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { CheckboxField } from "./CheckboxField";
import {
  CheckboxFieldGroup,
  CheckboxFieldGroupProps,
} from "./CheckboxFieldGroup";
import { FormViewer } from "./FormViewer";

interface FormData {
  value?: Array<string>;
}

const Template: Story<FormControllerProps<FormData> & CheckboxFieldGroupProps> =
  (args) => {
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
        <CheckboxFieldGroup {...props} name="value">
          <CheckboxField value="cake" text={"Cake"} />
          <CheckboxField value="waffles" text={"Waffles"} />
          <CheckboxField value="burger" text={"Burger"} />
        </CheckboxFieldGroup>
        <FormViewer getSubmittedValues={getSubmittedValues} />
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
