import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { CurrencyInput } from "./CurrencyInput";

export default {
  title: "Component/CurrencyInput",
  component: CurrencyInput,
} satisfies Meta<typeof CurrencyInput>;

type Story = StoryObj<typeof CurrencyInput>;

export const Standard = {
  args: { currency: "USD" },
} satisfies Story;

export const Prefilled = {
  args: { ...Standard.args, value: 123456.789 },
} satisfies Story;

export const WithoutCurrency = {
  args: { ...Prefilled.args, showCurrency: false },
} satisfies Story;

export const WithIcon = {
  args: { ...Prefilled.args, icon: <span>Hey</span> },
} satisfies Story;

export const AlignLeft = {
  args: { ...Prefilled.args, style: { textAlign: "left" } },
} satisfies Story;

export const PrefilledWithZeros = {
  args: { ...Standard.args, value: 500.0 },
} satisfies Story;

export const WithGrouping = {
  args: {
    ...Prefilled.args,
    useGrouping: true,
  },
} satisfies Story;

export const WithLocaleDe = {
  args: {
    ...WithGrouping.args,
    locale: "de",
    currency: "EUR",
  },
} satisfies Story;

export const WithLocalePl = {
  args: {
    ...WithGrouping.args,
    locale: "pl",
    currency: "EUR",
  },
} satisfies Story;
