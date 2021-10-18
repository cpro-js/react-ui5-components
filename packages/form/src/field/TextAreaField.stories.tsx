import { Story } from "@storybook/react";

import { FormControllerProps } from "../FormController";
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
  args,
  context
) => {
  const { initialValues, onSubmit, ...props } = args;

  return (
    <FormViewer
      component={<TextAreaField {...props} name={"text"} />}
      initialValues={initialValues}
      storyName={context.name}
      onSubmitAction={onSubmit}
    />
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
