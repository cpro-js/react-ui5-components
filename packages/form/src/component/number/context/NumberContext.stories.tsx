import { Story } from "@storybook/react";

import { CurrencyInput } from "../CurrencyInput";
import { NumberInput } from "../NumberInput";
import { NumberI18nProvider, NumberI18nProviderProps } from "./NumberContext";

export default {
  title: "Form/Component/NumberI18nProvider",
  component: NumberI18nProvider,
};

const Template: Story<NumberI18nProviderProps> = (args) => {
  const value = 1000555.482;
  const displayConfig = { useGrouping: true };

  return (
    <>
      <h2>Locale Provider with Locale [{args.locale}]</h2>
      <NumberI18nProvider {...args}>
        <h3>Number Input via Provider</h3>
        <NumberInput value={value} displayConfig={displayConfig} />
        <h3>Currency Input via Provider</h3>
        <CurrencyInput value={value} displayConfig={displayConfig} />
        <h3>Explicit IN</h3>
        <NumberInput
          value={value}
          displayConfig={displayConfig}
          locale="en-IN"
        />
        <CurrencyInput
          value={value}
          displayConfig={displayConfig}
          locale="en-IN"
          currency="INR"
        />
        <h3>Explicit JA (without fraction digits)</h3>
        <NumberInput
          value={value}
          displayConfig={displayConfig}
          locale="ja-JP"
        />
        <CurrencyInput
          value={value}
          displayConfig={displayConfig}
          locale="ja-JP"
          currency="JPY"
        />
      </NumberI18nProvider>
    </>
  );
};

export const Standard = Template.bind({});
Standard.args = { locale: "en", currency: "USD" };

export const Locale_DE = Template.bind({});
Locale_DE.args = { locale: "de", currency: "EUR" };

export const Nested: Story<NumberI18nProviderProps> = (args) => {
  const value = 1000555.482;
  const displayConfig = { useGrouping: true };

  return (
    <NumberI18nProvider locale="en-IN">
      <h2>Outer Part (en-IN)</h2>
      <NumberInput value={value} displayConfig={displayConfig} />
      <CurrencyInput
        value={value}
        displayConfig={displayConfig}
        currency="INR"
      />

      <div>
        <h2>Inner Part (de)</h2>
        <NumberI18nProvider locale="de" currency="EUR">
          <NumberInput value={value} displayConfig={displayConfig} />
          <CurrencyInput value={value} displayConfig={displayConfig} />
        </NumberI18nProvider>
      </div>
    </NumberI18nProvider>
  );
};
