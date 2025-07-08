import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { fn } from "storybook/test";

import { Select } from "./Select";
import { SelectItemAlt } from "./Select.stories";

const items: Array<SelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
];

export default {
  title: "Component/Select/Interactions",
  component: Select,
  args: {
    onChange: fn(),
    onFocus: fn(),
    onSelectionChange: fn(),
    onInput: fn(),
    onSubmit: fn(),
    onBlur: fn(),
  },
  tags: ["!autodocs"],
  render: (args) => <Select data-testid="select-input" {...args} />,
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

export const onSubmitAndChange = {
  args: {
    items,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("select-input");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>('[role="combobox"]')!;

    input.focus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    fireEvent.change(input);

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onSelectionChange).toHaveBeenCalled();
      expect(args.onSubmit).toHaveBeenCalled();
    });

    await userEvent.keyboard("{Enter}");
    fireEvent.change(input);

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onSelectionChange).toHaveBeenCalledTimes(1);
      expect(args.onSubmit).toHaveBeenCalledTimes(2);
    });
  },
} satisfies Story;

export const onChange = {
  args: {
    items,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("select-input");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>('[role="combobox"]')!;

    input.focus();
    await userEvent.type(input, "Test 1 String");

    fireEvent.change(input);

    input.blur();

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
    });
  },
} satisfies Story;
