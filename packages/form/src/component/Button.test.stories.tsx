import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";

import { Button } from "./Button";

export default {
  title: "Component/Button/Interactions",
  component: Button,
  args: {
    onFocus: fn(),
    onBlur: fn(),
    onClick: fn(),
  },
  tags: ["!autodocs"],
  render: (args) => <Button data-testid="button" {...args} />,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const onClickTest = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId("button");

    await userEvent.click(button);

    await waitFor(() => {
      expect(args.onClick).toHaveBeenCalled();
    });
  },
} satisfies Story;
