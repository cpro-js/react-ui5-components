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
  args: {},
} satisfies Story;

export const Prefilled = {
  args: { value: new Date() },
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
  args: { minDate: new Date() },
} satisfies Story;

/**
 *  Only the current date or previous dates can be selected.
 **/
export const MaxDateToday = {
  args: { maxDate: new Date() },
} satisfies Story;

const ISO8601Decorator: Decorator = (Story) => {
  return (
    <FormAdapter date={ISO8601DateAdapter}>
      <Story />
    </FormAdapter>
  );
};

export const ISO8601DateStandard = {
  args: {},
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DateCustomFormat = {
  args: {
    formatPattern: "dd__MM__yyyy",
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DatePrefilled = {
  args: {
    value: toISO8601DateString(new Date()),
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DateMinDateToday = {
  args: {
    minDate: toISO8601DateString(new Date()),
  },
  decorators: [ISO8601Decorator],
} satisfies Story;

export const ISO8601DateMaxDateToday = {
  args: {
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
  args: {},
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
    formatPattern: "dd.MM.yyyy",
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;

export const ISODateTimePrefilled = {
  args: {
    value: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;

export const ISODateTimeMinDateToday = {
  args: {
    minDate: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;

export const ISODateTimeMaxDateToday = {
  args: {
    maxDate: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
} satisfies Story;
