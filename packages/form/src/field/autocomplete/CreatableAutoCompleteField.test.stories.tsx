import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

import { COUNTRIES } from "../../component/autocomplete/AutoComplete-storyData";
import { FormController } from "../../form/FormController";
import { FormViewer, useFormViewer } from "../FormViewer";
import { CreatableAutoCompleteField } from "./CreatableAutoCompleteField";

interface FormData {
  item?: string;
}

const mockSubmit = fn();

export default {
  title: "Form/Field/Autocomplete/CreatableAutoCompleteField/InteractionTests",
  component: CreatableAutoCompleteField,
  parameters: {
    docs: { disable: true },
  },
  args: {
    onFocus: fn(),
  },
} satisfies Meta<typeof CreatableAutoCompleteField>;

type Story = StoryObj<typeof CreatableAutoCompleteField>;

export const PrefilledTest = {
  args: {
    initialItems: [COUNTRIES[1]],
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
        <CreatableAutoCompleteField
          {...props}
          name="item"
          data-testid="prefilled-creatable"
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
        <CreatableAutoCompleteField
          {...props}
          name="item"
          data-testid="required-creatable"
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
      const field = canvas.getByTestId("required-creatable");
      expect(field.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;
