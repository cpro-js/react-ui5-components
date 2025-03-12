import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { ISO8601DateAdapter } from "../form/adapter/date/ISO8601DateAdapter";
import { ISODateTimeAdapter } from "../form/adapter/date/ISODateTimeAdapter";
import { FormAdapter } from "../form/FormAdapter";
import { toISO8601DateString } from "../util/date";
import { DatePicker } from "./DatePicker";

export default {
  title: "Component/DatePicker",
  component: DatePicker,
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

export const Standard = {
  args: {
    onChange: (...args) => {
      console.log("onChange", ...args);
      action("onChange")(...args);
    },
  },
} satisfies Story;

export const Prefilled = {
  args: { ...Standard.args, value: new Date() },
} satisfies Story;

export const ShortFormat = {
  args: { ...Prefilled.args, formatPattern: "short" },
} satisfies Story;

export const CustomFormat = {
  args: { ...Prefilled.args, formatPattern: "dd---MM---yyyy" },
} satisfies Story;

/**
 *  Only the current date or any date in the future can be selected.
 **/
export const MinDateToday = {
  args: { ...Standard.args, minDate: new Date() },
} satisfies Story;

/**
 *  Only the current date or previous dates can be selected.
 **/
export const MaxDateToday = {
  args: { ...Standard.args, maxDate: new Date() },
} satisfies Story;

const ISO8601Date = {
  render: (args) => (
    <FormAdapter date={ISO8601DateAdapter}>
      <DatePicker {...args} />
    </FormAdapter>
  ),
} satisfies Story;

export const ISO8601DateStandard = {
  ...ISO8601Date,
  args: {
    onChange: (...args) => {
      console.log("onChange", ...args);
      action("onChange")(...args);
    },
  },
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
} satisfies Story;

export const ISO8601DateCustomFormat = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    formatPattern: "dd__MM__yyyy",
  },
} satisfies Story;

export const ISO8601DatePrefilled = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    value: toISO8601DateString(new Date()),
  },
} satisfies Story;

export const ISO8601DateMinDateToday = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    minDate: toISO8601DateString(new Date()),
  },
} satisfies Story;

export const ISO8601DateMaxDateToday = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    maxDate: toISO8601DateString(new Date()),
  },
} satisfies Story;

const ISODateTime = {
  render: (args) => (
    <FormAdapter date={ISODateTimeAdapter}>
      <DatePicker {...args} />
    </FormAdapter>
  ),
} satisfies Story;

export const ISODateTimeStandard = {
  ...ISODateTime,
  args: {
    onChange: (...args) => {
      console.log("onChange", ...args);
      action("onChange")(...args);
    },
  },
  // TODO iso date string does not for type text: https://github.com/storybookjs/storybook/issues/13713
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
} satisfies Story;

export const ISODateTimeCustomFormat = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    formatPattern: "dd.MM.yyyy",
  },
} satisfies Story;

export const ISODateTimePrefilled = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    value: new Date().toISOString(),
  },
} satisfies Story;

export const ISODateTimeMinDateToday = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    minDate: new Date().toISOString(),
  },
} satisfies Story;

export const ISODateTimeMaxDateToday = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    maxDate: new Date().toISOString(),
  },
} satisfies Story;
