import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { ISO8601DateAdapter } from "../form/adapter/date/ISO8601DateAdapter";
import { ISODateTimeAdapter } from "../form/adapter/date/ISODateTimeAdapter";
import { FormAdapter } from "../form/FormAdapter";
import { toISO8601DateString } from "../util/date";
import { DateTimePicker, DateTimePickerProps } from "./DateTimePicker";

const Template: Story<DateTimePickerProps> = (args) => {
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

const ISO8601DateTemplate: Story<DateTimePickerProps> = (args) => {
  return (
    <FormAdapter date={ISO8601DateAdapter}>
      <DateTimePicker {...args} />
    </FormAdapter>
  );
};

export const ISO8601DateStandard = ISO8601DateTemplate.bind({});
ISO8601DateStandard.args = {
  onChange: (...args) => {
    console.log("onChange", ...args);
    action("onChange")(...args);
  },
};
ISO8601DateStandard.argTypes = {
  value: { type: "string", control: "text" },
  minDate: { type: "string", control: "text" },
  maxDate: { type: "string", control: "text" },
};

export const ISO8601DateCustomFormat = ISO8601DateTemplate.bind({});
ISO8601DateCustomFormat.args = {
  ...ISO8601DateStandard.args,
  formatPattern: "dd.MM.yyyy, HH:mm:ss",
};
ISO8601DateCustomFormat.argTypes = { ...ISO8601DateStandard.argTypes };

export const ISO8601DatePrefilled = ISO8601DateTemplate.bind({});
ISO8601DatePrefilled.args = {
  ...ISO8601DateStandard.args,
  value: toISO8601DateString(new Date()),
};
ISO8601DatePrefilled.argTypes = { ...ISO8601DateStandard.argTypes };

export const ISO8601DateMinDateToday = ISO8601DateTemplate.bind({});
ISO8601DateMinDateToday.args = {
  ...ISO8601DateStandard.args,
  minDate: toISO8601DateString(new Date()),
};
ISO8601DateMinDateToday.argTypes = { ...ISO8601DateStandard.argTypes };

export const ISO8601DateMaxDateToday = ISO8601DateTemplate.bind({});
ISO8601DateMaxDateToday.args = {
  ...ISO8601DateStandard.args,
  maxDate: toISO8601DateString(new Date()),
};
ISO8601DateMaxDateToday.argTypes = { ...ISO8601DateStandard.argTypes };

const ISODateTimeTemplate: Story<DateTimePickerProps> = (args) => {
  return (
    <FormAdapter date={ISODateTimeAdapter}>
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

export default {
  title: "Form/Component/DateTimePicker",
  component: DateTimePicker,
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
};
