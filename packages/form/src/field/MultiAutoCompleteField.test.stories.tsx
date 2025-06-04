import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent } from "@storybook/testing-library";
import { waitFor, within } from "@testing-library/react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../component/autocomplete/AutoComplete-storyData";
import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { MultiAutoCompleteField } from "./MultiAutoCompleteField";

interface FormData {
  items?: Array<string>;
}
const mockSubmit = fn();

export default {
  title: "Form/Field/MultiAutoCompleteField/Interactions",
  component: MultiAutoCompleteField,
  args: {
    onFocus: fn(),
    onClose: fn(),
    onBlur: fn(),
    onAdd: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: { page: null },
  },
} satisfies Meta<typeof MultiAutoCompleteField>;

type Story = StoryObj<typeof MultiAutoCompleteField>;

const createPrefilledTest = (isDisabled: boolean) =>
  ({
    render: (props) => {
      const { submittedValues, handleSubmit } = useFormViewer<FormData>({
        onSubmit: mockSubmit,
      });

      return (
        <FormController
          initialValues={{
            items: [COUNTRIES[1].value, COUNTRIES[3].value],
          }}
          onSubmit={handleSubmit}
        >
          <MultiAutoCompleteField
            {...props}
            name="items"
            data-testid="prefilled-autocomplete"
            initialSuggestions={[COUNTRIES[1], COUNTRIES[3]]}
            disabled={isDisabled}
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
        expect(mockSubmit).toHaveBeenCalledWith(
          {
            items: [COUNTRIES[1].value, COUNTRIES[3].value],
          },
          expect.anything()
        );
      });
    },
  } satisfies Story);

export const PrefilledTest = createPrefilledTest(false);
export const PrefilledAndDisabledTest = createPrefilledTest(true);

export const RequiredTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <MultiAutoCompleteField
          {...props}
          name="items"
          required
          data-testid="required-autocomplete"
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
      const field = canvas.getByTestId("required-autocomplete");
      expect(field.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const UserInputTest = {
  args: {
    onSearch: SEARCH_COUNTRIES,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <MultiAutoCompleteField
          {...props}
          name="items"
          data-testid="user-input-autocomplete"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const host = canvas.getByTestId("user-input-autocomplete") as HTMLElement;
    const input = host.shadowRoot?.querySelector(
      "input.ui5-input-inner"
    ) as HTMLInputElement;

    await userEvent.type(input, "Ger");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await userEvent.keyboard("{Enter}");

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        {
          items: [COUNTRIES[4].value],
        },
        expect.anything()
      );
    });
  },
} satisfies Story;
