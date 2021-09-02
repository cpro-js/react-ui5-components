import { Story } from "@storybook/react";

import { DatePicker, DatePickerProps } from "./DatePicker";

const Template: Story<DatePickerProps> = (args) => {
  return <DatePicker {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {};

export const CustomFormat = Template.bind({});
CustomFormat.args = { ...Standard.args, formatPattern: "dd.MM.yyyy" };

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: new Date() };

export const MinDateToday = Template.bind({});
MinDateToday.args = { ...Standard.args, minDate: new Date() };

export const MaxDateToday = Template.bind({});
MaxDateToday.args = { ...Standard.args, maxDate: new Date() };

export default {
  title: "Form/Component/DatePicker",
  component: DatePicker,
  argTypes: {
    value: { control: "date" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
  },
};
