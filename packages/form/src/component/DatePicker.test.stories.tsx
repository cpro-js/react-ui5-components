import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { fn } from "storybook/test";

import { DatePicker } from "./DatePicker";

export default {
  title: "Component/DatePicker/Interactions",
  component: DatePicker,
  tags: ["!autodocs"],
  args: {
    onFocus: fn(),
    onChange: fn(),
    onSubmit: fn(),
    onInput: fn(),
    onBlur: fn(),
  },
  render: (args) => <DatePicker data-testid="date-picker" {...args} />,
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

export const onSubmitAndChangeTest = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("date-picker");
    const internalInput =
      host.shadowRoot!.querySelector<HTMLInputElement>("ui5-input")!;
    const input =
      internalInput.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;

    input.focus();

    await userEvent.type(input, "01.01.2024");
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
  },
} satisfies Story;

export const onChange = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = await canvas.findByTestId("date-picker");
    const internalInput =
      host.shadowRoot!.querySelector<HTMLInputElement>("ui5-input")!;
    const input =
      internalInput.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;

    input.focus();

    await userEvent.type(input, "01.01.2024");
    fireEvent.change(input);
    input.blur();

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
