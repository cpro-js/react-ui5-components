import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../../component/autocomplete/AutoComplete-storyData";
import { FormController } from "../../form/FormController";
import { FormViewer, useFormViewer } from "../FormViewer";
import { AutoCompleteField } from "./AutoCompleteField";

interface FormData {
  item?: string;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/Autocomplete/AutoCompleteField/InteractionTests",
  component: AutoCompleteField,
  parameters: {
    docs: { disable: true },
  },
  args: {
    onFocus: fn(),
    onInputChange: fn(),
    onBlur: fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof AutoCompleteField>;

type Story = StoryObj<typeof AutoCompleteField>;

export const PrefilledTest = {
  args: {
    initialItems: COUNTRIES,
    loadItems: SEARCH_COUNTRIES,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController
        initialValues={{ item: COUNTRIES[1].value }}
        onSubmit={handleSubmit}
      >
        <AutoCompleteField {...props} name="item" data-testid="autocomplete" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { item: COUNTRIES[1].value },
        expect.anything()
      );
    });
    const host = canvas.getByTestId("autocomplete") as HTMLElement;
    const input = host.shadowRoot?.querySelector(
      "input.ui5-input-inner"
    ) as HTMLInputElement;

    input.select();

    await userEvent.keyboard("{Backspace}");

    await userEvent.type(input, "Ger");
    await new Promise((resolve) => setTimeout(resolve, 500));

    await userEvent.keyboard("{Enter}");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { item: COUNTRIES[4].value },
        expect.anything()
      );
    });
  },
} satisfies Story;

export const RequiredTest = {
  args: {
    required: true,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <AutoCompleteField
          {...props}
          name="item"
          data-testid="autocomplete-required"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      const field = canvas.getByTestId("autocomplete-required");
      expect(field.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const UserInputTest = {
  args: {
    initialItems: COUNTRIES,
    loadItems: SEARCH_COUNTRIES,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <AutoCompleteField
          {...props}
          name="item"
          data-testid="autocomplete-user"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("autocomplete-user") as HTMLElement;

    const input = host.shadowRoot?.querySelector(
      "input.ui5-input-inner"
    ) as HTMLInputElement;

    await userEvent.type(input, "Ger");

    await userEvent.keyboard("{Enter}");

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { item: COUNTRIES[4].value },
        expect.anything()
      );
    });
  },
} satisfies Story;
