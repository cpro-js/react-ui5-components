import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";

import { NumberInput } from "./NumberInput";

export default {
  title: "Component/NumberInput",
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

const Template: StoryFn<typeof NumberInput> = (args) => {
  return <NumberInput {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: 123456.789 };

export const WithGrouping = Template.bind({});
WithGrouping.args = {
  ...Prefilled.args,
  useGrouping: true,
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

export const WithLocalePl = Template.bind({});
WithLocalePl.args = {
  ...WithGrouping.args,
  locale: "pl",
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
  minimumIntegerDigits: 3,
  value: 1,
};

export const MinFractionDigits = Template.bind({});
MinFractionDigits.storyName = "Display Config: MinFractionDigits = 6";
MinFractionDigits.args = {
  ...Standard.args,
  minimumFractionDigits: 6,
  maximumFractionDigits: 9,
  value: 1.234,
};

export const MaxFractionDigits = Template.bind({});
MaxFractionDigits.storyName = "Display Config: MaxFractionDigits = 1";
MaxFractionDigits.args = {
  ...Prefilled.args,
  maximumFractionDigits: 1,
};

export const MinSignificantDigits = Template.bind({});
MinSignificantDigits.storyName = "Display Config: MinSignificantDigits = 3";
MinSignificantDigits.args = {
  ...Standard.args,
  minimumSignificantDigits: 3,
  value: 1,
};

export const MaxSignificantDigits = Template.bind({});
MaxSignificantDigits.storyName = "Display Config: MaxSignificantDigits = 3";
MaxSignificantDigits.args = {
  ...Prefilled.args,
  maximumSignificantDigits: 3,
};

export const InputMin = Template.bind({});
InputMin.storyName = "Input Config: MinValue = 0";
InputMin.args = {
  ...Prefilled.args,
  minimumValue: 0,
};

export const InputMinAlt = Template.bind({});
InputMinAlt.storyName = "Input Config: MinValue = -3";
InputMinAlt.args = {
  ...Prefilled.args,
  minimumValue: -3,
};

export const InputMinFailure = Template.bind({});
InputMinFailure.storyName = "Input Config: Fails for MinValue = 2";
InputMinFailure.args = {
  ...Prefilled.args,
  minimumValue: 2,
};

export const InputMax = Template.bind({});
InputMax.storyName = "Input Config: MaxValue = 999";
InputMax.args = {
  ...Prefilled.args,
  maximumValue: 999,
};

export const InputMaxFailure = Template.bind({});
InputMaxFailure.storyName = "Input Config: Fails for MaxValue = -2";
InputMaxFailure.args = {
  ...Prefilled.args,
  maximumValue: -2,
};

export const InputMaxFractionDigits = Template.bind({});
InputMaxFractionDigits.storyName = "Input Config: MaxFractionDigits = 1";
InputMaxFractionDigits.args = {
  ...Prefilled.args,
  maximumFractionDigits: 1,
};

export const InputIntegersOnly = Template.bind({});
InputIntegersOnly.storyName =
  "Input Config: Integers Only = maxFractionDigits = 0";
InputIntegersOnly.args = {
  ...Prefilled.args,
  maximumFractionDigits: 0,
};

export const InputOnInput = Template.bind({});
InputOnInput.storyName = "Input Events: onInput triggers on replaced values";
InputOnInput.args = {
  ...Standard.args,
  maximumValue: 2,
  onInput: (event) => action("onInput")(event.target.value),
};
