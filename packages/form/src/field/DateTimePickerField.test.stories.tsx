import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import { FormController, FormControllerProps } from "../form/FormController";
import { toISODateTimeString } from "../util/date";
import { DateTimePickerField } from "./DateTimePickerField";
import { FormViewer, useFormViewer } from "./FormViewer";

interface FormData {
  date?: string;
}

const meta = {
  title: "Form/Field/DateTimePickerField/Interactions",
  component: DateTimePickerField,
  tags: ["!autodocs"],
  argTypes: {
    onSubmit: {
      action: "submit",
    },
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
  },
  args: {
    onFocus: fn(),
    onBlur: fn(),
    onInput: fn(),
    onChange: fn(),
  },
  parameters: {
    form: {
      initialValues: {},
      onSubmit: action("form-submit"),
    },
  },
} satisfies Meta<typeof DateTimePickerField>;

export default meta;

type Story = StoryObj<typeof DateTimePickerField>;

const mockSubmit = fn();

const todayStr = toISODateTimeString(new Date());

export const PrefilledTest = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData>
        onSubmit={handleSubmit}
        initialValues={{ date: todayStr }}
      >
        <DateTimePickerField data-testid="datetimepicker" name="date" />

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
        { date: todayStr },
        expect.anything()
      );
    });

    const host = canvas.getByTestId("datetimepicker") as HTMLElement;
    const ui5Input = host.shadowRoot?.querySelector("ui5-input");
    const innerInput = ui5Input?.shadowRoot?.querySelector(
      "input"
    ) as HTMLInputElement;

    const newDate = "14.07.25, 12:00:00";
    const expectedIso = new Date(2025, 6, 14, 12, 0, 0).toISOString();

    innerInput.select();
    await userEvent.keyboard("{Control>}a{/Control}{Backspace}");
    await userEvent.type(innerInput, newDate);
    innerInput.dispatchEvent(new Event("change", { bubbles: true }));

    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { date: expectedIso },
        expect.anything()
      );
    });
  },
} satisfies Story;

export const RequiredTest = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <DateTimePickerField
          data-testid="required"
          name="requiredField"
          required
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
      const required = canvas.getByTestId("required");
      expect(required.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const UserInputTest = {
  render: (props) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController<FormData> onSubmit={handleSubmit}>
        <DateTimePickerField
          {...props}
          data-testid="datetime-userinput"
          name="date"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("datetime-userinput") as HTMLElement;

    const ui5Input = host.shadowRoot?.querySelector("ui5-input");
    const input = ui5Input?.shadowRoot?.querySelector(
      "input"
    ) as HTMLInputElement;

    const inputValue = "18.08.24, 10:00:00";
    const expectedIso = new Date(2024, 7, 18, 10, 0, 0).toISOString();

    input.select();
    await userEvent.keyboard("{Control>}a{/Control}{Backspace}");
    await userEvent.type(input, inputValue);

    input.dispatchEvent(new Event("change", { bubbles: true }));

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { date: expectedIso },
        expect.anything()
      );
    });
  },
} satisfies Story;
