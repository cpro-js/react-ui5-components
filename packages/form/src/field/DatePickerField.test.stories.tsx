import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import { FormController, FormControllerProps } from "../form/FormController";
import { toISO8601DateString, toISODateTimeString } from "../util/date";
import { DatePickerField } from "./DatePickerField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldRef } from "./types";

interface FormData {
  date?: string;
}

const meta = {
  title: "Form/Field/DatePickerField/Interactions",
  component: DatePickerField,
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
    onInput: fn(),
    onChange: fn(),
    onBlur: fn(),
  },
  parameters: {
    form: {
      initialValues: {},
      onSubmit: action("form-submit"),
    },
  },
} satisfies Meta<typeof DatePickerField>;

export default meta;

type Story = StoryObj<typeof DatePickerField>;

const mockSubmit = fn();
const todayStr = toISO8601DateString(new Date());

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
        <DatePickerField data-testid="datetimepicker" name="date" />

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

    const datePicker = canvas.getByTestId("datetimepicker") as HTMLElement;
    const ui5Input = datePicker.shadowRoot?.querySelector("ui5-input");
    const innerInput = ui5Input?.shadowRoot?.querySelector(
      "input"
    ) as HTMLInputElement;

    innerInput.select();
    await userEvent.keyboard("{Backspace}");

    await userEvent.type(innerInput, "04.06.2025");
    innerInput.dispatchEvent(new Event("change", { bubbles: true }));

    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { date: "2025-06-04" },
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
        <DatePickerField data-testid="required" name="requiredField" required />

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
        <DatePickerField
          {...props}
          data-testid="datepicker-userinput"
          name="date"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("datepicker-userinput") as HTMLElement;

    const ui5Input = host.shadowRoot?.querySelector("ui5-input");
    const input = ui5Input?.shadowRoot?.querySelector(
      "input"
    ) as HTMLInputElement;

    input.select();
    await userEvent.keyboard("{Control>}a{/Control}{Backspace}");
    await userEvent.type(input, "15.04.2020");

    input.dispatchEvent(new Event("change", { bubbles: true }));

    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { date: "2020-04-15" },
        expect.anything()
      );
    });
  },
} satisfies Story;
