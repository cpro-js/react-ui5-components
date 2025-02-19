import { StoryFn } from "@storybook/react";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import { TextAreaField, TextAreaFieldProps } from "./TextAreaField";
import { FormFieldRef } from "./types";

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

const Template: StoryFn<
  FormControllerProps<FormData> & TextAreaFieldProps<FormData, "text">
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer<FormData>({
    onSubmit: onSubmit,
  });
  const fieldRef = useRef<FormFieldRef<FormData, "text">>(null);

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <TextAreaField {...props} ref={fieldRef} name={"text"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>
  );
};

const I18nTemplate: StoryFn<
  FormControllerProps<FormData> & TextAreaFieldProps<FormData, "text">
> = (args, context) => {
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
