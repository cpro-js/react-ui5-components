import { Story } from "@storybook/react";
import { FormEvent, useState } from "react";

import { FormController, FormControllerProps } from "../FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer } from "./FormViewer";
import { TextAreaField, TextAreaFieldProps } from "./TextAreaField";

export default {
  title: "Form/Field/TextAreaField",
  component: TextAreaField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & TextAreaFieldProps> = (
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
      <TextAreaField {...props} name={"text"} />
      <FormViewer getSubmittedValues={getSubmittedValues} />
    </FormController>
  );
};

const I18nTemplate: Story<FormControllerProps<FormData> & TextAreaFieldProps> =
  (args, context) => {
    return (
      <FormI18nProvider
        getValidationErrorMessage={({ name }, error) => {
          return `Field '${name}' has Error '${
            error.type
          }'. Original error message: ${error.message || "---"}`;
        }}
      >
        {Template(args, context)}
      </FormI18nProvider>
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
  ...Empty.args,
  required: true,
};

export const ValidationMinLength = Template.bind({});
ValidationMinLength.args = {
  ...Empty.args,
  minLength: 4,
};

export const ValidationMinMaxLength = Template.bind({});
ValidationMinMaxLength.args = {
  ...Empty.args,
  minLength: 4,
  maxLength: 10,
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  ...ValidationRequired.args,
};

export const ValidationTranslationMinLength = I18nTemplate.bind({});
ValidationTranslationMinLength.args = {
  ...ValidationMinLength.args,
};

export const ValidationTranslationMinMaxLength = I18nTemplate.bind({});
ValidationTranslationMinMaxLength.args = {
  ...ValidationMinMaxLength.args,
};
