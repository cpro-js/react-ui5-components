import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { waitFor, within } from "@testing-library/react";

import { RadioButton } from "./RadioButton";

export default {
  title: "Component/RadioButton/Interactions",
  component: RadioButton,
  args: {
    onFocus: fn(),
    onChange: fn(),
  },
  render: (args) => <RadioButton data-testid="radio-button" {...args} />,
} satisfies Meta<typeof RadioButton>;

type Story = StoryObj<typeof RadioButton>;

export const onChange = {
  args: {
    name: "test",
    text: "Test",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("radio-button");
    const radio =
      host.shadowRoot!.querySelector<HTMLElement>('[role="radio"]')!;

    radio.focus();

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
    });
  },
} satisfies Story;
