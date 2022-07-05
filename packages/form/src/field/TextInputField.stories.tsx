import { Story } from "@storybook/react";
import { Title, Toolbar } from "@ui5/webcomponents-react";
import { useRef } from "react";

import { Button } from "../component/Button";
import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import { TextInputField, TextInputFieldProps } from "./TextInputField";
import { FormFieldElement } from "./types";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & TextInputFieldProps> = (
  args
) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });
  const fieldRef = useRef<FormFieldElement>();

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <TextInputField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>
  );
};

const I18nTemplate: Story<FormControllerProps<FormData> & TextInputFieldProps> =
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

export default {
  title: "Form/Field/TextInputField",
  component: TextInputField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
