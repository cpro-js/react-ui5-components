import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import { NumberInputField, NumberInputFieldProps } from "./NumberInputField";

interface FormData {
  theNumber?: number;
}

const Template: Story<FormControllerProps<FormData> & NumberInputFieldProps> = (
  args
) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <NumberInputField {...props} name={"theNumber"} />
      <FormViewer submittedValues={submittedValues} />
    </FormController>
  );
};

const I18nTemplate: Story<
  FormControllerProps<FormData> & NumberInputFieldProps
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
Empty.args = { useGrouping: true };

export const Prefilled = Template.bind({});
Prefilled.args = {
  initialValues: {
    theNumber: 123456.789,
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

export const ValidationMin = Template.bind({});
ValidationMin.args = {
  ...Empty.args,
  min: 4,
};

export const ValidationMinMax = Template.bind({});
ValidationMinMax.args = {
  ...Empty.args,
  min: 4,
  max: 10,
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  ...ValidationRequired.args,
};

export const ValidationTranslationMin = I18nTemplate.bind({});
ValidationTranslationMin.args = {
  ...ValidationMin.args,
};

export const ValidationTranslationMinMax = I18nTemplate.bind({});
ValidationTranslationMinMax.args = {
  ...ValidationMinMax.args,
};

export default {
  title: "Form/Field/NumberInputField",
  component: NumberInputField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
