import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import { ISO8601DateAdapter } from "../form/adapter/date/ISO8601DateAdapter";
import { ISODateTimeAdapter } from "../form/adapter/date/ISODateTimeAdapter";
import { FormAdapter } from "../form/FormAdapter";
import { toISO8601DateString } from "../util/date";
import { DatePicker, DatePickerProps } from "./DatePicker";

export default {
  title: "Form/Component/DatePicker",
  component: DatePicker,
  argTypes: {
    value: { type: "string", control: "text" },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
} satisfies Meta<typeof DatePicker>;

const Template: StoryFn<DatePickerProps> = (args) => {
  return <DatePicker {...args} />;
};

export const Standard = Template.bind({});
(Standard.args = {
  onChange: (...args) => {
    console.log("onChange", ...args);
    action("onChange")(...args);
  },
}),
  (Standard.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByTestId("datepicker-input"));

    const datePickerPopup = await within(document.body).findByRole(
      "dialog",
      {},
      { timeout: 3000 }
    );
    expect(datePickerPopup).toBeVisible();

    //click on current date
    const dateButtons = await within(datePickerPopup).findAllByRole("button");
    const firstDateButton = dateButtons.find(
      (btn) => btn.textContent && /\d+/.test(btn.textContent)
    );

    const selectedDate = firstDateButton!.textContent!.trim();

    await userEvent.click(firstDateButton!);

    await expect(canvas.findByTestId("datepicker-input")).resolves.toHaveValue(
      expect.stringContaining(selectedDate)
    );
  });

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: new Date() };

export const ShortFormat = Template.bind({});
ShortFormat.args = { ...Prefilled.args, formatPattern: "short" };

export const CustomFormat = Template.bind({});
CustomFormat.args = { ...Prefilled.args, formatPattern: "dd---MM---yyyy" };

/**
 *  Only the current date or any date in the future can be selected.
 **/
export const MinDateToday = Template.bind({});
MinDateToday.args = { ...Standard.args, minDate: new Date() };

/**
 *  Only the current date or previous dates can be selected.
 **/
export const MaxDateToday = Template.bind({});
MaxDateToday.args = { ...Standard.args, maxDate: new Date() };

const ISO8601DateTemplate: StoryFn<DatePickerProps> = (args) => {
  return (
    <FormAdapter date={ISO8601DateAdapter}>
      <DatePicker {...args} />
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
  formatPattern: "dd__MM__yyyy",
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

const ISODateTimeTemplate: StoryFn<DatePickerProps> = (args) => {
  return (
    <FormAdapter date={ISODateTimeAdapter}>
      <DatePicker {...args} />
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
  formatPattern: "dd.MM.yyyy",
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
