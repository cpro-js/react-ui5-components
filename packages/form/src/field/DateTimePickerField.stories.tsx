import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { FormController } from "../form/FormController";
import { DateTimePickerField } from "./DateTimePickerField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldRef } from "./types";
import { FormI18nProvider, toISODateTimeString } from "..";

interface FormData {
  date?: string;
}

const meta = {
  title: "Form/Field/DateTimePickerField",
  component: DateTimePickerField,
  argTypes: {
    minDate: { type: "string", control: "text" },
    maxDate: { type: "string", control: "text" },
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
        <DateTimePickerField {...props} ref={fieldRef} name={"date"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof DateTimePickerField>;

export default meta;

type Story = StoryObj<typeof DateTimePickerField>;

export const Empty = {
  args: {},
} satisfies Story;

export const Prefilled = {
  parameters: {
    form: {
      initialValues: {
        date: toISODateTimeString(new Date()),
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
  args: { minDate: toISODateTimeString(new Date()) },
} satisfies Story;

export const ValidationMaxDateToday = {
  args: { maxDate: toISODateTimeString(new Date()) },
} satisfies Story;

export const ValidationRequiredAndOnlyToday = {
  args: {
    required: true,
    minDate: toISODateTimeString(new Date()),
    maxDate: toISODateTimeString(new Date()),
  },
} satisfies Story;

export const ValidationTranslationRequired = {
  render(args, context) {
    return (
      <FormI18nProvider
        getValidationErrorMessage={({ name }, error) => {
          return `Field '${name}' has Error '${
            error.type
          }'. Original error message: ${error.message || "---"}`;
        }}
      >
        {meta.render?.(args, context)}
      </FormI18nProvider>
    );
  },

  args: {
    ...ValidationRequired.args,
  },
} satisfies Story;
