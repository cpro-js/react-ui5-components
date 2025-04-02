import { action } from "@storybook/addon-actions";
import { Decorator, Meta, StoryFn, StoryObj } from "@storybook/react";

import { ISODateTimeAdapter } from "../form/adapter/date/ISODateTimeAdapter";
import { FormAdapter } from "../form/FormAdapter";
import { DateTimePicker } from "./DateTimePicker";

export default {
  title: "Component/DateTimePicker",
  component: DateTimePicker,
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
} satisfies Meta<typeof DateTimePicker>;

type Story = StoryObj<typeof DateTimePicker>;

export const Standard = {
  args: {},
} satisfies Story;

export const CustomFormat = {
  args: {
    formatPattern: "dd_MM_yyyy 'um' HH:mm",
  },
} satisfies Story;

export const Prefilled = {
  args: { value: new Date() },
} satisfies Story;

export const MinDateToday = {
  args: { minDate: new Date() },
} satisfies Story;

export const MaxDateToday = {
  args: { maxDate: new Date() },
} satisfies Story;

const ISODateTimeDecorator: Decorator = (Story) => (
  <FormAdapter dateTime={ISODateTimeAdapter}>
    <Story />
  </FormAdapter>
);

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
    formatPattern: "dd_MM_yyyy 'ab' HH:mm:ss",
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
