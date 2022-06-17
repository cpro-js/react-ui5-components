import { Story } from "@storybook/react";

import { CurrencyInput } from "../CurrencyInput";
import { NumberInput } from "../NumberInput";
import {
  NumberContextProvider,
  NumberContextProviderProps,
} from "./NumberContext";

export default {
  title: "Form/Component/NumberContextProvider",
  component: NumberContextProvider,
};

const Template: Story<NumberContextProviderProps> = (args) => {
  const value = 1000555.482;

  return (
    <>
      <h2>Locale Provider with Locale [{args.locale}]</h2>
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
      </NumberContextProvider>
    </>
  );
};

export const Standard = Template.bind({});
Standard.args = { locale: "en", currency: "USD", useGrouping: true };

export const Locale_DE = Template.bind({});
Locale_DE.args = { locale: "de", currency: "EUR", useGrouping: true };

export const Nested: Story<NumberContextProviderProps> = (args) => {
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
};
