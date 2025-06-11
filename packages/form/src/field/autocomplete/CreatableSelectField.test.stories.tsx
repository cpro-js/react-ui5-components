import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

import { COUNTRIES } from "../../component/autocomplete/AutoComplete-storyData";
import { FormController } from "../../form/FormController";
import { FormViewer, useFormViewer } from "../FormViewer";
import { CreatableSelectField } from "./CreatableSelectField";

interface FormData {
  item?: string;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/Autocomplete/CreatableSelectField/InteractionTests",
  component: CreatableSelectField,
  args: {
    onFocus: fn(),
    onInputChange: fn(),
    onValueCreate: fn(),
    onBlur: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: { disable: true },
  },
} satisfies Meta<typeof CreatableSelectField>;

type Story = StoryObj<typeof CreatableSelectField>;

export const PrefilledTest = {
  args: {
    items: COUNTRIES,
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
        <CreatableSelectField
          {...props}
          name="item"
          data-testid="prefilled-creatable-select"
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
        { item: COUNTRIES[1].value },
        expect.anything()
      );
    });
    const host = canvas.getByTestId(
      "prefilled-creatable-select"
    ) as HTMLElement;

    const input = host.shadowRoot?.querySelector(
      "input.ui5-input-inner"
    ) as HTMLInputElement;

    input.select();

    await userEvent.keyboard("{Backspace}");

    await userEvent.type(input, "Lux");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await userEvent.keyboard("{Enter}");

    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { item: COUNTRIES[7].value },
        expect.anything()
      );
    });
  },
} satisfies Story;

export const RequiredTest = {
  args: {
    items: COUNTRIES,
    required: true,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <CreatableSelectField
          {...props}
          name="item"
          data-testid="required-creatable-select"
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
      const field = canvas.getByTestId("required-creatable-select");
      expect(field.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const UserInputTest = {
  args: {
    items: COUNTRIES,
  },
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <CreatableSelectField
          {...props}
          name="item"
          data-testid="user-input-select"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("user-input-select") as HTMLElement;

    const input = host.shadowRoot?.querySelector(
      "input.ui5-input-inner"
    ) as HTMLInputElement;

    const customValue = "Brasil";

    await userEvent.type(input, customValue);

    await new Promise((resolve) => setTimeout(resolve, 500));

    await userEvent.keyboard("{ArrowDown}");

    await userEvent.keyboard("{Enter}");

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { item: customValue },
        expect.anything()
      );
    });
  },
} satisfies Story;
