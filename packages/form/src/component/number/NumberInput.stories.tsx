import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { NumberInput } from "./NumberInput";

export default {
  title: "Component/NumberInput",
  component: NumberInput,
} satisfies Meta<typeof NumberInput>;

type Story = StoryObj<typeof NumberInput>;

export const Standard = {
  args: {},
} satisfies Story;

export const Prefilled = {
  args: { ...Standard.args, value: 123456.789 },
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
  },
} satisfies Story;

export const WithLocaleIn = {
  args: {
    ...WithGrouping.args,
    locale: "en-IN",
  },
} satisfies Story;

export const WithLocalePl = {
  args: {
    ...WithGrouping.args,
    locale: "pl",
  },
} satisfies Story;

export const WithIcon = {
  args: {
    ...Standard.args,
    icon: <span>EUR</span>,
  },
} satisfies Story;

export const MinIntegerDigits = {
  storyName: "Display Config: MinIntegerDigits = 3",
  args: {
    ...Standard.args,
    minimumIntegerDigits: 3,
    value: 1,
  },
} satisfies Story;

export const MinFractionDigits = {
  storyName: "Display Config: MinFractionDigits = 6",
  args: {
    ...Standard.args,
    minimumFractionDigits: 6,
    maximumFractionDigits: 9,
    value: 1.234,
  },
} satisfies Story;

export const MaxFractionDigits = {
  storyName: "Display Config: MaxFractionDigits = 1",
  args: {
    ...Prefilled.args,
    maximumFractionDigits: 1,
  },
} satisfies Story;

export const MinSignificantDigits = {
  storyName: "Display Config: MinSignificantDigits = 3",
  args: {
    ...Standard.args,
    minimumSignificantDigits: 3,
    value: 1,
  },
} satisfies Story;

export const MaxSignificantDigits = {
  storyName: "Display Config: MaxSignificantDigits = 3",
  args: {
    ...Prefilled.args,
    maximumSignificantDigits: 3,
  },
} satisfies Story;

export const InputMin = {
  storyName: "Input Config: MinValue = 0",
  args: {
    ...Prefilled.args,
    minimumValue: 0,
  },
} satisfies Story;

export const InputMinAlt = {
  storyName: "Input Config: MinValue = -3",
  args: {
    ...Prefilled.args,
    minimumValue: -3,
  },
} satisfies Story;

export const InputMinFailure = {
  storyName: "Input Config: Fails for MinValue = 2",
  args: {
    ...Prefilled.args,
    minimumValue: 2,
  },
} satisfies Story;

export const InputMax = {
  storyName: "Input Config: MaxValue = 999",
  args: {
    ...Prefilled.args,
    maximumValue: 999,
  },
} satisfies Story;

export const InputMaxFailure = {
  storyName: "Input Config: Fails for MaxValue = -2",
  args: {
    ...Prefilled.args,
    maximumValue: -2,
  },
} satisfies Story;

export const InputMaxFractionDigits = {
  storyName: "Input Config: MaxFractionDigits = 1",
  args: {
    ...Prefilled.args,
    maximumFractionDigits: 1,
  },
} satisfies Story;

export const InputIntegersOnly = {
  storyName: "Input Config: Integers Only = maxFractionDigits = 0",
  args: {
    ...Prefilled.args,
    maximumFractionDigits: 0,
  },
} satisfies Story;

export const InputOnInput = {
  storyName: "Input Events: onInput triggers on replaced values",
  args: {
    ...Standard.args,
    maximumValue: 2,
    onInput: (event) => action("onInput")(event.target.value),
  },
} satisfies Story;
