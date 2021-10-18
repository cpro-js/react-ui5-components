import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../FormController";
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
  (args, context) => {
    const { initialValues, onSubmit, ...props } = args;

    return (
      <FormViewer
        component={
          <CheckboxFieldGroup {...props} name="value">
            <CheckboxField value="cake" text={"Cake"} />
            <CheckboxField value="waffles" text={"Waffles"} />
            <CheckboxField value="burger" text={"Burger"} />
          </CheckboxFieldGroup>
        }
        initialValues={initialValues}
        storyName={context.name}
        onSubmitAction={onSubmit}
      />
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
