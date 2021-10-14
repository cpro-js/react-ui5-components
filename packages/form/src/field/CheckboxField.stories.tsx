import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { CheckboxField, CheckboxFieldProps } from "./CheckboxField";

interface FormData {
  value?: string;
}

interface FormDataBoolean {
  value?: boolean;
}

const createTemplate = function <T>(): Story<
  FormControllerProps<T> & CheckboxFieldProps
> {
  return (args) => {
    const { initialValues, onSubmit, ...props } = args;

    return (
      <FormController<T> {...{ initialValues, onSubmit }}>
        <CheckboxField {...props} name={"value"} value={"on"} />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </FormController>
    );
  };
};

const Template = createTemplate<FormData>();

export const Empty = Template.bind({});
Empty.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Empty.args,
  initialValues: {
    value: "on",
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

const TemplateBoolean = createTemplate<FormDataBoolean>();

export const BooleanEmpty = TemplateBoolean.bind({});
BooleanEmpty.args = {
  boolean: true,
};

export const BooleanPrefilled = TemplateBoolean.bind({});
BooleanPrefilled.args = {
  ...BooleanEmpty.args,
  initialValues: {
    value: true,
  },
};

export const BooleanDisabled = TemplateBoolean.bind({});
BooleanDisabled.args = {
  ...BooleanPrefilled.args,
  disabled: true,
};

export const BooleanReadonly = TemplateBoolean.bind({});
BooleanReadonly.args = {
  ...BooleanPrefilled.args,
  readonly: true,
};

export const BooleanValidationRequired = TemplateBoolean.bind({});
BooleanValidationRequired.args = {
  ...BooleanEmpty.args,
  required: true,
};

export default {
  title: "Form/Field/CheckboxField",
  component: CheckboxField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
