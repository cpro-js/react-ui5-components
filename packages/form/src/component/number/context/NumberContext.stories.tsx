import { Decorator, Meta, StoryFn, StoryObj } from "@storybook/react";

import { CurrencyInput } from "../CurrencyInput";
import { NumberInput } from "../NumberInput";
import { NumberContextProvider } from "./NumberContext";

export default {
  title: "Component/NumberContextProvider",
  component: NumberContextProvider,
} satisfies Meta<typeof NumberContextProvider>;

type Story = StoryObj<typeof NumberContextProvider>;

const NumberDecorator: Decorator = (Story, context) => {
  const { args } = context;
  const value = 1000555.482;

  return (
    <>
      <h2>Locale Provider with Locale [{args.locale as string}]</h2>
      <NumberContextProvider {...args}>
        <h3>Number Input via Provider</h3>
        <NumberInput value={value} />
        <h3>Currency Input via Provider</h3>
        <CurrencyInput value={value} />
        <h3>Explicit IN</h3>
        <NumberInput value={value} locale="en-IN" />
        <CurrencyInput value={value} locale="en-IN" currency="INR" />
        <h3>Explicit JA (without fraction digits for currency)</h3>
        <NumberInput value={value} locale="ja-JP" />
        <CurrencyInput value={value} locale="ja-JP" currency="JPY" />
        <Story />
      </NumberContextProvider>
    </>
  );
};

export const Standard = {
  args: { locale: "en", currency: "USD", useGrouping: true },
  decorators: [NumberDecorator],
} satisfies Story;

export const Locale_DE = {
  args: { locale: "de", currency: "EUR", useGrouping: true },
  decorators: [NumberDecorator],
} satisfies Story;

export const Nested = {
  render: () => {
    const value = 1000555.482;

    return (
      <NumberContextProvider locale="en-IN" currency="USD" useGrouping>
        <h2>Outer Part (en-IN)</h2>
        <NumberInput value={value} />
        <CurrencyInput value={value} currency="INR" />
        <div>
          <h2>Inner Part (de)</h2>
          <NumberContextProvider locale="de" currency="EUR">
            <NumberInput value={value} />
            <CurrencyInput value={value} />
            <CurrencyInput value={value} showCurrency={false} />
          </NumberContextProvider>
        </div>
        <div>
          <h2>No Grouping, special warning message, 1 maxFractionDigits</h2>
          <NumberContextProvider
            useGrouping={false}
            maximumFractionDigits={1}
            showCurrency={false}
            getNumberWarningMessage={(type, discardedValue) =>
              `${type}: ${discardedValue}`
            }
          >
            <NumberInput value={value} />
            <CurrencyInput value={value} />
            <CurrencyInput value={value} showCurrency />
          </NumberContextProvider>
        </div>
      </NumberContextProvider>
    );
  },
} satisfies Story;
