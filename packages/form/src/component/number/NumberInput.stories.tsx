import { Story } from "@storybook/react";

import { NumberInput, NumberInputProps } from "./NumberInput";

export default {
  title: "Form/Component/NumberInput",
  component: NumberInput,
};

const Template: Story<NumberInputProps> = (args) => {
  return <NumberInput {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: 123456.789 };

export const WithGrouping = Template.bind({});
WithGrouping.args = {
  ...Prefilled.args,
  displayConfig: { useGrouping: true },
};

export const WithLocaleDe = Template.bind({});
WithLocaleDe.args = {
  ...WithGrouping.args,
  locale: "de",
};

export const WithLocaleIn = Template.bind({});
WithLocaleIn.args = {
  ...WithGrouping.args,
  locale: "en-IN",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Standard.args,
  icon: <span>EUR</span>,
};

export const MinIntegerDigits = Template.bind({});
MinIntegerDigits.storyName = "Display Config: MinIntegerDigits = 3";
MinIntegerDigits.args = {
  ...Standard.args,
  displayConfig: { minimumIntegerDigits: 3 },
  value: 1,
};

export const MinFractionDigits = Template.bind({});
MinFractionDigits.storyName = "Display Config: MinFractionDigits = 6";
MinFractionDigits.args = {
  ...Standard.args,
  displayConfig: { minimumFractionDigits: 6, maximumFractionDigits: 9 },
  inputConfig: { maximumFractionDigits: 9 },
  value: 1.234,
};

export const MaxFractionDigits = Template.bind({});
MaxFractionDigits.storyName = "Display Config: MaxFractionDigits = 1";
MaxFractionDigits.args = {
  ...Prefilled.args,
  displayConfig: { maximumFractionDigits: 1 },
};

export const MinSignificantDigits = Template.bind({});
MinSignificantDigits.storyName = "Display Config: MinSignificantDigits = 3";
MinSignificantDigits.args = {
  ...Standard.args,
  displayConfig: { minimumSignificantDigits: 3 },
  value: 1,
};

export const MaxSignificantDigits = Template.bind({});
MaxSignificantDigits.storyName = "Display Config: MaxSignificantDigits = 3";
MaxSignificantDigits.args = {
  ...Prefilled.args,
  displayConfig: { maximumSignificantDigits: 3 },
};

export const InputMax = Template.bind({});
InputMax.storyName = "Input Config: Max = 100";
InputMax.args = {
  ...Prefilled.args,
  max: 100,
};

export const InputMaxFractionDigits = Template.bind({});
InputMaxFractionDigits.storyName = "Input Config: MaxFractionDigits = 1";
InputMaxFractionDigits.args = {
  ...Prefilled.args,
  inputConfig: { maximumFractionDigits: 1 },
};

export const InputIntegersOnly = Template.bind({});
InputIntegersOnly.storyName =
  "Input Config: Integers Only = maxFractionDigits = 0";
InputIntegersOnly.args = {
  ...Prefilled.args,
  inputConfig: { maximumFractionDigits: 0 },
};

export const InputMaxSignificantDigits = Template.bind({});
InputMaxSignificantDigits.storyName = "Input Config: MaxSignificantDigits = 3";
InputMaxSignificantDigits.args = {
  ...Prefilled.args,
  inputConfig: { maximumSignificantDigits: 3 },
};
