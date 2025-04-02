import { action } from "@storybook/addon-actions";
import { Decorator, Meta, StoryObj } from "@storybook/react";

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

const ISO8601Decorator: Decorator = (Story) => {
  return (
    <FormAdapter date={ISO8601DateAdapter}>
      <Story />
    </FormAdapter>
  );
};

export const ISO8601DateStandard = {
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
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DateCustomFormat = {
  args: {
    ...ISO8601DateStandard.args,
    formatPattern: "dd__MM__yyyy",
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DatePrefilled = {
  args: {
    ...ISO8601DateStandard.args,
    value: toISO8601DateString(new Date()),
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DateMinDateToday = {
  args: {
    ...ISO8601DateStandard.args,
    minDate: toISO8601DateString(new Date()),
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DateMaxDateToday = {
  args: {
    ...ISO8601DateStandard.args,
    maxDate: toISO8601DateString(new Date()),
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

const ISODateTimeDecorator: Decorator = (Story) => {
  return (
    <FormAdapter date={ISODateTimeAdapter}>
      <Story />
    </FormAdapter>
  );
};

export const ISODateTimeStandard = {
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
  decorators: [ISODateTimeDecorator],
} satisfies Story;

export const ISODateTimeCustomFormat = {
  args: {
    ...ISODateTimeStandard.args,
    formatPattern: "dd.MM.yyyy",
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;

export const ISODateTimePrefilled = {
  args: {
    ...ISODateTimeStandard.args,
    value: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;

export const ISODateTimeMinDateToday = {
  args: {
    ...ISODateTimeStandard.args,
    minDate: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;

export const ISODateTimeMaxDateToday = {
  args: {
    ...ISODateTimeStandard.args,
    maxDate: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;
