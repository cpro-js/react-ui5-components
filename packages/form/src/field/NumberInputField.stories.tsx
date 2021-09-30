import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { NumberInputField, NumberInputFieldProps } from "./NumberInputField";

interface FormData {
  number?: number;
}

const Template: Story<FormControllerProps<FormData> & NumberInputFieldProps> = (
  args
) => {
  const { initialValues, onSubmit, ...props } = args;

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <NumberInputField {...props} name={"number"} />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
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
Empty.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = {
  initialValues: {
    number: 10,
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
  ...Empty.args,
  required: true,
};

export const ValidationTranslationMin = I18nTemplate.bind({});
ValidationTranslationMin.args = {
  ...Empty.args,
  min: 4,
};

export const ValidationTranslationMinMax = I18nTemplate.bind({});
ValidationTranslationMinMax.args = {
  ...Empty.args,
  min: 4,
  max: 10,
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
