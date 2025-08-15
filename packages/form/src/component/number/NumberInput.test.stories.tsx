import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { fn } from "storybook/test";

import { NumberInput } from "./NumberInput";

export default {
  title: "Component/NumberInput/Interactions",
  component: NumberInput,
  args: {
    onChange: fn(),
    onSubmit: fn(),
    onInput: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => <NumberInput data-testid="number-input" {...args} />,
} satisfies Meta<typeof NumberInput>;

type Story = StoryObj<typeof NumberInput>;

export const onSubmitAndChangeTest = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("number-input");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;
    input.focus();

    await userEvent.type(input, "1234");
    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onSubmit).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onSubmit).toHaveBeenCalledTimes(2);
    });

    await userEvent.type(input, "5");
    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledTimes(2);
      expect(args.onSubmit).toHaveBeenCalledTimes(3);
    });
  },
} satisfies Story;

export const onChangeOnlyTest = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("number-input");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;
    input.focus();

    await userEvent.type(input, "789");
    fireEvent.change(input);
    input.blur();

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
