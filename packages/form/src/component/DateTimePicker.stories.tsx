import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";

import { ISODateTimeAdapter } from "../form/adapter/date/ISODateTimeAdapter";
import { FormAdapter } from "../form/FormAdapter";
import { DateTimePicker, DateTimePickerProps } from "./DateTimePicker";

const Template: StoryFn<DateTimePickerProps> = (args) => {
  return <DateTimePicker {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
  onChange: (...args) => {
    console.log("onChange", ...args);
    action("onChange")(...args);
  },
};
export const CustomFormat = Template.bind({});
CustomFormat.args = { ...Standard.args, formatPattern: "dd.MM.yyyy, HH:mm:ss" };

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: new Date() };

export const MinDateToday = Template.bind({});
MinDateToday.args = { ...Standard.args, minDate: new Date() };

export const MaxDateToday = Template.bind({});
MaxDateToday.args = { ...Standard.args, maxDate: new Date() };

const ISODateTimeTemplate: StoryFn<DateTimePickerProps> = (args) => {
  return (
    <FormAdapter dateTime={ISODateTimeAdapter}>
      <DateTimePicker {...args} />
    </FormAdapter>
  );
};

export const ISODateTimeStandard = ISODateTimeTemplate.bind({});
ISODateTimeStandard.args = {
  onChange: (...args) => {
    console.log("onChange", ...args);
    action("onChange")(...args);
  },
};

// TODO iso date string does not for type text: https://github.com/storybookjs/storybook/issues/13713
ISODateTimeStandard.argTypes = {
  value: { type: "string", control: "text" },
  minDate: { type: "string", control: "text" },
  maxDate: { type: "string", control: "text" },
};

export const ISODateTimeCustomFormat = ISODateTimeTemplate.bind({});
ISODateTimeCustomFormat.args = {
  ...ISODateTimeStandard.args,
  formatPattern: "dd.MM.yyyy, HH:mm:ss",
};
ISODateTimeCustomFormat.argTypes = { ...ISODateTimeStandard.argTypes };

export const ISODateTimePrefilled = ISODateTimeTemplate.bind({});
ISODateTimePrefilled.args = {
  ...ISODateTimeStandard.args,
  value: new Date().toISOString(),
};
ISODateTimePrefilled.argTypes = { ...ISODateTimeStandard.argTypes };

export const ISODateTimeMinDateToday = ISODateTimeTemplate.bind({});
ISODateTimeMinDateToday.args = {
  ...ISODateTimeStandard.args,
  minDate: new Date().toISOString(),
};
ISODateTimeMinDateToday.argTypes = { ...ISODateTimeStandard.argTypes };

export const ISODateTimeMaxDateToday = ISODateTimeTemplate.bind({});
ISODateTimeMaxDateToday.args = {
  ...ISODateTimeStandard.args,
  maxDate: new Date().toISOString(),
};
ISODateTimeMaxDateToday.argTypes = { ...ISODateTimeStandard.argTypes };

const meta: Meta = {
  title: "Form/Component/DateTimePicker",
  component: DateTimePicker,
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
};

export default meta;
