import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { fn } from "storybook/test";

import { DateTimePicker } from "./DateTimePicker";

export default {
  title: "Component/DateTimePicker/Interactions",
  component: DateTimePicker,
  args: {
    onFocus: fn(),
    onChange: fn(),
    onSubmit: fn(),
    onInput: fn(),
    onBlur: fn(),
  },
  tags: ["!autodocs"],
  render: (args) => <DateTimePicker data-testid="date-time-picker" {...args} />,
} satisfies Meta<typeof DateTimePicker>;

type Story = StoryObj<typeof DateTimePicker>;

export const onSubmitAndChangeTest: Story = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("date-time-picker");

    const internalInput =
      host.shadowRoot!.querySelector<HTMLInputElement>("ui5-input")!;

    const input =
      internalInput.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;

    input.focus();

    await userEvent.type(input, "01.01.2024, 12:30:00");
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
};

export const onChangeTest = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("date-time-picker");

    const internalInput =
      host.shadowRoot!.querySelector<HTMLInputElement>("ui5-input")!;
    const input =
      internalInput.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;

    input.focus();

    await userEvent.type(input, "01.01.2024, 15:00:00");
    fireEvent.change(input);
    input.blur();

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
