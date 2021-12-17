import { Story } from "@storybook/react";

import { CurrencyInput } from "../CurrencyInput";
import { NumberInput } from "../NumberInput";
import { NumberContextProps, NumberLocaleProvider } from "./NumberContext";

export default {
  title: "Form/Component/NumberLocaleProvider",
  component: NumberLocaleProvider,
};

const Template: Story<NumberContextProps> = (args) => {
  const value = 1000555.482;
  const displayConfig = { useGrouping: true };

  return (
    <>
      <h2>Locale Provider with Locale [{args.locale}]</h2>
      <NumberLocaleProvider value={args}>
        <h3>Number Input via Provider</h3>
        <NumberInput value={value} displayConfig={displayConfig} />
        <h3>Currency Input via Provider</h3>
        <CurrencyInput
          value={value}
          displayConfig={displayConfig}
          currency=""
        />
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
      </NumberLocaleProvider>
    </>
  );
};

export const Standard = Template.bind({});
Standard.args = { locale: "en", currency: "USD" };

export const Locale_DE = Template.bind({});
Locale_DE.args = { locale: "de", currency: "EUR" };
