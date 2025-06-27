import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";

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
  tags: ["!autodocs"],
  render: (args) => <TextInput data-testid="text-input" {...args} />,
} satisfies Meta<typeof TextInput>;
type Story = StoryObj<typeof TextInput>;

export const onSubmitTest: Story = {
  args: {
    value: "",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("text-input");
    const input = host.shadowRoot!.querySelector<HTMLInputElement>("input")!;

    input.focus();

    await userEvent.type(input, "Hello");

    fireEvent.change(input); //gets only detected if onChange event really accurse

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
      expect(args.onChange).toHaveBeenCalled();
    });

    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      //onChange should only accure if value changed
      //onSubmit always on enter pressed
      expect(args.onSubmit).toHaveBeenCalledTimes(2);
      expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await userEvent.type(input, "2345");
    fireEvent.change(input);
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledTimes(3);
      expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};

export const onlyOnChangeTest: Story = {
  args: {
    value: "",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("text-input");
    const input = host.shadowRoot!.querySelector<HTMLInputElement>("input")!;

    input.focus();

    await userEvent.type(input, "Hello");

    fireEvent.change(input);

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onSubmit).not.toHaveBeenCalled();
    });
  },
};
