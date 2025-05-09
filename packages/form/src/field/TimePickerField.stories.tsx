import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { FormController } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { TimePickerField } from "./TimePickerField";
import { FormFieldRef } from "./types";

interface FormData {
  time?: string;
}

const meta = {
  title: "Form/Field/TimePickerField",
  component: TimePickerField,
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
    const fieldRef = useRef<FormFieldRef<FormData, "time">>(null);

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <TimePickerField {...props} ref={fieldRef} name={"time"} />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof TimePickerField>;

export default meta;

type Story = StoryObj<typeof TimePickerField>;

export const Empty = {
  args: {},
} satisfies Story;

export const Prefilled = {
  args: {
    formatPattern: "HH:mm",
  },
  parameters: {
    form: {
      initialValues: {
        time: "12:55",
      },
    },
  },
} satisfies Story;

export const PrefilledHHmmss = {
  args: {
    formatPattern: "HH:mm:ss",
  },
  parameters: {
    form: {
      initialValues: {
        time: "12:55:11",
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
