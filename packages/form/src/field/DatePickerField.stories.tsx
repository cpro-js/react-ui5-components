import { StoryFn } from "@storybook/react";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { toISO8601DateString } from "../util/date";
import { DatePickerField, DatePickerFieldProps } from "./DatePickerField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldElement } from "./types";

interface FormData {
  date?: string;
}

const Template: StoryFn<
  FormControllerProps<FormData> & DatePickerFieldProps<FormData, "date">
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer<FormData>({
    onSubmit: onSubmit,
  });
  const fieldRef = useRef<FormFieldElement<FormData, "date">>(null);

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <DatePickerField {...props} ref={fieldRef} name={"date"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>
  );
};

const I18nTemplate: StoryFn<
  FormControllerProps<FormData> & DatePickerFieldProps<FormData, "date">
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
    date: toISO8601DateString(new Date()),
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
ValidationMinDateToday.args = { minDate: toISO8601DateString(new Date()) };

export const ValidationMaxDateToday = Template.bind({});
ValidationMaxDateToday.args = { maxDate: toISO8601DateString(new Date()) };

export const ValidationRequiredAndOnlyToday = Template.bind({});
ValidationRequiredAndOnlyToday.args = {
  required: true,
  minDate: toISO8601DateString(new Date()),
  maxDate: toISO8601DateString(new Date()),
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  ...ValidationRequired.args,
};

export default {
  title: "Form/Field/DatePickerField",
  component: DatePickerField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
};
