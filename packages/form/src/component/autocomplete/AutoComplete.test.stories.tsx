import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";

import { AutoComplete } from "./AutoComplete";
import { SEARCH_COUNTRIES } from "./AutoComplete-storyData";

export default {
  title: "Component/AutoComplete/AutoComplete/Interactions",
  component: AutoComplete,
  args: {
    onFocus: fn(),
    onValueChange: fn(),
    onInputChange: fn(),
  },
  tags: ["!autodocs"],
  render: (args) => <AutoComplete data-testid="autocomplete" {...args} />,
} satisfies Meta<typeof AutoComplete>;

type Story = StoryObj<typeof AutoComplete>;

export const onValueChangeTest = {
  args: {
    loadItems: SEARCH_COUNTRIES,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("autocomplete");

    const input =
      host.shadowRoot!.querySelector<HTMLInputElement>("input#inner")!;
    console.log(input);
    input.focus();

    await userEvent.type(input, "Mex");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(input);

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onValueChange).toHaveBeenCalled();
    });
  },
} satisfies Story;
