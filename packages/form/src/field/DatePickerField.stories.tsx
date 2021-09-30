import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { DatePickerField, DatePickerFieldProps } from "./DatePickerField";

interface FormData {
  date?: Date;
}

const Template: Story<FormControllerProps<FormData> & DatePickerFieldProps> = (
  args,
  context
) => {
  const { initialValues, onSubmit, ...props } = args;
  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <DatePickerField {...props} name={"date"} />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </FormController>
  );
};

const I18nTemplate: Story<
  FormControllerProps<FormData> & DatePickerFieldProps
> = (args, context) => {
  return (
    <FormI18nProvider
      getValidationErrorMessage={(
        fieldName,
        fieldValue,
        validationRule,
        rules
      ) => {
        return `Field '${fieldName}' has Error '${validationRule}'`;
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
    date: new Date(),
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

export const ValidationMinDateToday = Template.bind({});
ValidationMinDateToday.args = { minDate: new Date() };

export const ValidationMaxDateToday = Template.bind({});
ValidationMaxDateToday.args = { maxDate: new Date() };

export const ValidationRequiredAndOnlyToday = Template.bind({});
ValidationRequiredAndOnlyToday.args = {
  required: true,
  minDate: new Date(),
  maxDate: new Date(),
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  required: true,
};

export default {
  title: "Form/Field/DatePickerField",
  component: DatePickerField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
