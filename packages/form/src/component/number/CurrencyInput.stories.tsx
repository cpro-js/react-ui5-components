import { Story } from "@storybook/react";

import { CurrencyInput, CurrencyInputProps } from "./CurrencyInput";

export default {
  title: "Form/Component/CurrencyInput",
  component: CurrencyInput,
};

const Template: Story<CurrencyInputProps> = (args) => {
  return <CurrencyInput {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = { ...Standard.args, value: 123456.789 };

export const PrefilledWithZeros = Template.bind({});
PrefilledWithZeros.args = { ...Standard.args, value: 500.0 };

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
