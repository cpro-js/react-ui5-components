import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";

import { MultiSelect, MultiSelectItem } from "./MultiSelect";

interface MultiSelectItemAlt extends MultiSelectItem {
  alt: string;
}

const items: Array<MultiSelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
];

export default {
  title: "Component/MultiSelect/Interactions",
  component: MultiSelect,
  args: {
    onSelectionChange: fn(),
    onFocus: fn(),
  },
  render: (args) => <MultiSelect data-testid="multi-select" {...args} />,
} satisfies Meta<typeof MultiSelect>;

type Story = StoryObj<typeof MultiSelect>;

export const onSelectionChange = {
  args: {
    items,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("multi-select");

    const input = host.shadowRoot!.querySelector<HTMLInputElement>("input")!;

    console.log(input);

    input.focus();

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    fireEvent.change(input);

    await waitFor(() => {
      expect(args.onSelectionChange).toHaveBeenCalledTimes(2);
    });
  },
} satisfies Story;
