import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { fireEvent, waitFor, within } from "@testing-library/react";

import { SEARCH_COUNTRIES } from "./autocomplete/AutoComplete-storyData";
import { MultiAutoComplete } from "./MultiAutoComplete";

export default {
  title: "Component/MultiAutoComplete/Interactions",
  component: MultiAutoComplete,
  args: {
    onSelectionChange: fn(),
    onFocus: fn(),
    onClose: fn(),
    onChange: fn(),
    onAdd: fn(),
  },
  render: (args) => <MultiAutoComplete data-testid="multi-auto" {...args} />,
} satisfies Meta<typeof MultiAutoComplete>;

type Story = StoryObj<typeof MultiAutoComplete>;

export const onChangeAndSelectionChange = {
  args: {
    values: [],
    onSearch: SEARCH_COUNTRIES,
    style: { width: "50%" },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("multi-auto");

    const input = host.shadowRoot!.querySelector<HTMLInputElement>("input")!;

    console.log(input);

    input.focus();

    await userEvent.type(input, "Ger");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalled();
      expect(args.onSelectionChange).toHaveBeenCalled();
    });
  },
} satisfies Story;
