import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { FormEvent, useState } from "react";

import {
  DateTimePicker,
  DateTimePickerProps,
} from "../component/DateTimePicker";
import { ISODateTimeAdapter } from "../form/adapter/date/ISODateTimeAdapter";
import { FormAdapter } from "../form/FormAdapter";
import { FormController, FormControllerProps } from "../form/FormController";
import {
  DateTimePickerField,
  DateTimePickerFieldProps,
} from "./DateTimePickerField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormI18nProvider, toISODateTimeString } from "..";

interface FormData {
  date?: string;
}

const Template: Story<
  FormControllerProps<FormData> & DateTimePickerFieldProps
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <DateTimePickerField {...props} name={"date"} />
      <FormViewer submittedValues={submittedValues} />
    </FormController>
  );
};

const I18nTemplate: Story<
  FormControllerProps<FormData> & DateTimePickerFieldProps
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
    date: toISODateTimeString(new Date()),
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
ValidationMinDateToday.args = { minDate: toISODateTimeString(new Date()) };

export const ValidationMaxDateToday = Template.bind({});
ValidationMaxDateToday.args = { maxDate: toISODateTimeString(new Date()) };

export const ValidationRequiredAndOnlyToday = Template.bind({});
ValidationRequiredAndOnlyToday.args = {
  required: true,
  minDate: toISODateTimeString(new Date()),
  maxDate: toISODateTimeString(new Date()),
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  ...ValidationRequired.args,
};

export default {
  title: "Form/Field/DateTimePickerField",
  component: DateTimePicker,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
};
