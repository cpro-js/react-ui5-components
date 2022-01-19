import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import {
  CurrencyInputField,
  CurrencyInputFieldProps,
} from "./CurrencyInputField";
import { FormViewer, useFormViewer } from "./FormViewer";

interface FormData {
  theNumber?: number;
}

const Template: Story<FormControllerProps<FormData> & CurrencyInputFieldProps> =
  (args) => {
    const { initialValues, onSubmit, ...props } = args;

    const { submittedValues, handleSubmit } = useFormViewer({
      onSubmit: onSubmit,
    });

    return (
      <FormController {...{ initialValues, onSubmit: handleSubmit }}>
        <CurrencyInputField {...props} name={"theNumber"} />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  };

const I18nTemplate: Story<
  FormControllerProps<FormData> & CurrencyInputFieldProps
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
Empty.args = { currency: "EUR" };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Empty.args,
  initialValues: {
    theNumber: 10.29,
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

export const LocalizedDe = I18nTemplate.bind({});
LocalizedDe.args = {
  ...ValidationMinMax.args,
  locale: "de",
};

export default {
  title: "Form/Field/CurrencyInputField",
  component: CurrencyInputField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
