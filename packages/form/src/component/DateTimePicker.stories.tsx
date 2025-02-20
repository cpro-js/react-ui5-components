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

export const Standard: Story = {
  args: {
    onChange: (...args) => {
      console.log("onChange", ...args);
      action("onChange")(...args);
    },
  },
};

export const CustomFormat: Story = {
  args: {
    ...Standard.args,
    formatPattern: "dd_MM_yyyy 'um' HH:mm",
  },
};

export const Prefilled: Story = {
  args: { ...Standard.args, value: new Date() },
};

export const MinDateToday: Story = {
  args: { ...Standard.args, minDate: new Date() },
};

export const MaxDateToday: Story = {
  args: { ...Standard.args, maxDate: new Date() },
};

const ISODateTimeDecorator: Decorator = (Story) => (
  <FormAdapter dateTime={ISODateTimeAdapter}>
    <Story />
  </FormAdapter>
);

export const ISODateTimeStandard: Story = {
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
};

export const ISODateTimeCustomFormat: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    formatPattern: "dd_MM_yyyy 'ab' HH:mm:ss",
  },

  decorators: [ISODateTimeDecorator],
};

export const ISODateTimePrefilled: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    value: new Date().toISOString(),
  },

  decorators: [ISODateTimeDecorator],
};

export const ISODateTimeMinDateToday: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    minDate: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
};

export const ISODateTimeMaxDateToday: Story = {
  ...ISODateTimeStandard,
  args: {
    ...ISODateTimeStandard.args,
    maxDate: new Date().toISOString(),
  },
  decorators: [ISODateTimeDecorator],
};
