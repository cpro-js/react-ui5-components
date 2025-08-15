import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent } from "@storybook/testing-library";
import { waitFor, within } from "@testing-library/react";
import { fn } from "storybook/test";

import { Checkbox } from "./Checkbox";

export default {
  title: "Component/Checkbox/Interactions",
  component: Checkbox,
  args: {
    onFocus: fn(),
    onChange: fn(),
  },
  tags: ["!autodocs"],
  render: (args) => <Checkbox data-testid="checkbox" {...args} />,
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const onChange = {
  args: {
    name: "test",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("checkbox");

    const checkbox =
      host.shadowRoot!.querySelector<HTMLElement>('[role="checkbox"]')!;

    checkbox.focus();

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
    });
  },
} satisfies Story;
