import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { fn } from "storybook/test";

import { CurrencyInput } from "./CurrencyInput";

export default {
  title: "Component/CurrencyInput/Interactions",
  component: CurrencyInput,
  args: {
    onFocus: fn(),
    onChange: fn(),
    onSubmit: fn(),
    onInput: fn(),
    onBlur: fn(),
  },
  render: (args) => <CurrencyInput data-testid="currency-input" {...args} />,
} satisfies Meta<typeof CurrencyInput>;

type Story = StoryObj<typeof CurrencyInput>;

export const onSubmitAndChangeTest = {
  args: {
    currency: "USD",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("currency-input");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;

    input.focus();

    await userEvent.type(input, "1234.56");
    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onSubmit).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledTimes(2);
      expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    input.select();
    await userEvent.type(input, "7");
    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledTimes(2);
      expect(args.onSubmit).toHaveBeenCalledTimes(3);
    });
  },
} satisfies Story;

export const onChange = {
  args: {
    currency: "USD",
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("currency-input");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;

    input.focus();

    await userEvent.type(input, "987.65");
    fireEvent.change(input);

    input.blur();

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
