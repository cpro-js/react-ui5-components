import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";

import { TextArea } from "./TextArea";

export default {
  title: "Component/TextArea/Interactions",
  component: TextArea,
  args: {
    onChange: fn(),
    onFocus: fn(),
    onInput: fn(),
  },
  render: (args) => <TextArea name="text" data-testid="text-input" {...args} />,
} satisfies Meta<typeof TextArea>;

type Story = StoryObj<typeof TextArea>;

export const textAreaChangeTest: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("text-input");

    const input =
      host.shadowRoot!.querySelector<HTMLTextAreaElement>("textarea")!;

    input.focus();

    await userEvent.type(input, "Test 123");

    fireEvent.change(input);

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
    });
  },
};
