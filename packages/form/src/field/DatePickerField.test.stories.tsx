import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { toISO8601DateString, toISODateTimeString } from "../util/date";
import { DatePickerField, DatePickerFieldProps } from "./DatePickerField";
import { DateTimePickerField } from "./DateTimePickerField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldRef } from "./types";

interface FormData {
  date?: string;
}

const meta = {
  title: "Form/Field/DatePickerField",
  component: DatePickerField,
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

const todayStr = toISODateTimeString(new Date());

export const InteractionTests = {
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
  },
} satisfies Story;

export const InteractionTestsRequired = {
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
