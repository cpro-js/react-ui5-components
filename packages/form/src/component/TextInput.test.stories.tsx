import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { waitFor, within } from "@testing-library/react";

import { TextInput } from "./TextInput";

export default {
  title: "Component/TextInput/Interactions",
  component: TextInput,
  args: {
    onChange: fn(),
    onSubmit: fn(),
    onSelectionChange: fn(),
    onFocus: fn(),
    onInput: fn(),
    onBlur: fn(),
  },
  render: (args) => <TextInput data-testid="text-input" {...args} />,
} satisfies Meta<typeof TextInput>;
type Story = StoryObj<typeof TextInput>;

export const onSubmitTest: Story = {
  args: {
    value: "",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Zugriff auf Shadow DOM innerhalb von <ui5-input>
    const host = canvas.getByTestId("text-input");
    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;

    input.focus();

    await userEvent.type(input, "Hello");

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};
