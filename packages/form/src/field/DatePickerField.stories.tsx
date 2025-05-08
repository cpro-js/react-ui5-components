import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { toISO8601DateString } from "../util/date";
import { DatePickerField, DatePickerFieldProps } from "./DatePickerField";
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
  render(props, context) {
    const { initialValues, onSubmit, ...formControllerProps } =
      context.parameters.form;
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: onSubmit,
    });
    const fieldRef = useRef<FormFieldRef<FormData, "date">>(null);

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <DatePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof DatePickerField>;

export default meta;

type Story = StoryObj<typeof DatePickerField>;

export const Empty = {
  args: {},
} satisfies Story;

export const Prefilled = {
  parameters: {
    form: {
      initialValues: {
        date: toISO8601DateString(new Date()),
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Readonly = {
  args: {
    readonly: true,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    required: true,
  },
} satisfies Story;

export const ValidationMinDateToday = {
  args: {
    minDate: toISO8601DateString(new Date()),
  },
} satisfies Story;

export const ValidationMaxDateToday = {
  args: {
    maxDate: toISO8601DateString(new Date()),
  },
} satisfies Story;

export const ValidationRequiredAndOnlyToday = {
  args: {
    required: true,
    minDate: toISO8601DateString(new Date()),
    maxDate: toISO8601DateString(new Date()),
  },
} satisfies Story;

export const ValidationTranslationRequired = {
  render: (args, context) => (
    <FormI18nProvider
      getValidationErrorMessage={({ name }, error) =>
        `Field '${name}' has Error '${error.type}'. Original error: ${
          error.message || "---"
        }`
      }
    >
      {meta.render?.(args, context)}
    </FormI18nProvider>
  ),
  args: {
    ...ValidationRequired.args,
  },
} satisfies Story;

const mockSubmit = fn();
const today = new Date();
const todayStr = toISO8601DateString(today);
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
        <DatePickerField data-testid="datepicker" name="date" />

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
        <DatePickerField
          data-testid="required"
          name="requiredField"
          {...ValidationRequired.args}
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
