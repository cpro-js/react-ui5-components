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

export const Standard: Story = {
  args: {
    onChange: (...args) => {
      console.log("onChange", ...args);
      action("onChange")(...args);
    },
  },
};

export const Prefilled: Story = {
  args: { ...Standard.args, value: new Date() },
};

export const ShortFormat: Story = {
  args: { ...Prefilled.args, formatPattern: "short" },
};

export const CustomFormat: Story = {
  args: { ...Prefilled.args, formatPattern: "dd---MM---yyyy" },
};

/**
 *  Only the current date or any date in the future can be selected.
 **/
export const MinDateToday: Story = {
  args: { ...Standard.args, minDate: new Date() },
};

/**
 *  Only the current date or previous dates can be selected.
 **/
export const MaxDateToday: Story = {
  args: { ...Standard.args, maxDate: new Date() },
};

const ISO8601Date: Story = {
  render: (args) => (
    <FormAdapter date={ISO8601DateAdapter}>
      <DatePicker {...args} />
    </FormAdapter>
  ),
};

export const ISO8601DateStandard: Story = {
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
};

export const ISO8601DateCustomFormat: Story = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    formatPattern: "dd__MM__yyyy",
  },
};

export const ISO8601DatePrefilled: Story = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    value: toISO8601DateString(new Date()),
  },
};

export const ISO8601DateMinDateToday: Story = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    minDate: toISO8601DateString(new Date()),
  },
};

export const ISO8601DateMaxDateToday: Story = {
  ...ISO8601Date,
  args: {
    ...ISO8601DateStandard.args,
    maxDate: toISO8601DateString(new Date()),
  },
};

const ISODateTime: Story = {
  render: (args) => (
    <FormAdapter date={ISODateTimeAdapter}>
      <DatePicker {...args} />
    </FormAdapter>
  ),
};

export const ISODateTimeStandard: Story = {
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
};

export const ISODateTimeCustomFormat: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    formatPattern: "dd.MM.yyyy",
  },
};

export const ISODateTimePrefilled: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    value: new Date().toISOString(),
  },
};

export const ISODateTimeMinDateToday: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    minDate: new Date().toISOString(),
  },
};

export const ISODateTimeMaxDateToday: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    maxDate: new Date().toISOString(),
  },
};
