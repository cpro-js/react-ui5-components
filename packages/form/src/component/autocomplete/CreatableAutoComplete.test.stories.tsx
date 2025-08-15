import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { fn } from "storybook/test";

import { SEARCH_COUNTRIES } from "./AutoComplete-storyData";
import { CreatableAutoComplete } from "./CreatableAutoComplete";

export default {
  title: "Component/AutoComplete/CreatableAutoComplete/Interactions",
  component: CreatableAutoComplete,
  args: {
    onFocus: fn(),
    onValueChange: fn(),
    onValueCreate: fn(),
    onInputChange: fn(),
  },
  tags: ["!autodocs"],
  render: (args) => (
    <CreatableAutoComplete data-testid="creatable-auto" {...args} />
  ),
} satisfies Meta<typeof CreatableAutoComplete>;

type Story = StoryObj<typeof CreatableAutoComplete>;

export const onValueChangeAndCreateTest = {
  args: {
    loadItems: SEARCH_COUNTRIES,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("creatable-auto");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;
    console.log(input);
    input.focus();

    await userEvent.type(input, "NewTest");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(input);

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onValueChange).toHaveBeenCalled();
      expect(args.onValueCreate).toHaveBeenCalled();
    });
  },
} satisfies Story;
