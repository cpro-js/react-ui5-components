import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { FormController } from "../form/FormController";
import { CheckboxField } from "./CheckboxField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldRef } from "./types";

interface FormData {
  value?: string;
}

interface FormDataBoolean {
  value?: boolean;
}

export default {
  title: "Form/Field/CheckboxField",
  component: CheckboxField,
  parameters: {
    form: {
      initialValues: {},
    },
  },
  render(props, context) {
    const { onSubmit, initialValues, ...formControllerProps } =
      context.parameters.form;
    const fieldRef = useRef<FormFieldRef<FormData, "value">>(null);

    const isBoolean = typeof initialValues?.value === "boolean";

    if (isBoolean) {
      const { submittedValues, handleSubmit } = useFormViewer<FormDataBoolean>({
        onSubmit,
      });

      return (
        <FormController<FormDataBoolean>
          {...formControllerProps}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <CheckboxField {...props} ref={fieldRef} name="value" />
          <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
        </FormController>
      );
    } else {
      const { submittedValues, handleSubmit } = useFormViewer<FormData>({
        onSubmit,
      });

      return (
        <FormController<FormData>
          {...formControllerProps}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <CheckboxField {...props} ref={fieldRef} name="value" />
          <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
        </FormController>
      );
    }
  },
} satisfies Meta<typeof CheckboxField>;

type Story = StoryObj<typeof CheckboxField>;

export const Empty = {
  args: {},
} satisfies Story;

export const Prefilled = {
  parameters: {
    form: {
      initialValues: {
        value: "on",
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

export const BooleanEmpty = {
  args: {
    boolean: true,
  },
};

export const BooleanPrefilled = {
  args: {
    ...BooleanEmpty.args,
  },
  parameters: {
    form: {
      initialValues: {
        value: true,
      },
    },
  },
} satisfies Story;

export const BooleanDisabled = {
  args: {
    ...BooleanEmpty.args,
    disabled: true,
  },
} satisfies Story;

export const BooleanReadonly = {
  args: {
    ...BooleanEmpty.args,
    readonly: true,
  },
} satisfies Story;

export const BooleanValidationRequired = {
  args: {
    ...BooleanEmpty.args,
    required: true,
  },
} satisfies Story;
