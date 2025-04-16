import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import { NumberInputField, NumberInputFieldProps } from "./NumberInputField";
import { FormFieldRef } from "./types";

interface FormData {
  theNumber?: number;
}

const meta = {
  title: "Form/Field/NumberInputField",
  component: NumberInputField,
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
      onSubmit,
    });

    const fieldRef = useRef<FormFieldRef<FormData, "theNumber">>(null);

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <NumberInputField
          {...props}
          ref={fieldRef}
          name="theNumber"
          onSubmit={action("onSubmit")}
          onChange={action("onChange")}
        />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof NumberInputField>;

export default meta;

const i18nStoryRenderer = (
  renderFn: typeof meta.render
): typeof meta.render => {
  return (args, context) => (
    <FormI18nProvider
      getValidationErrorMessage={({ name, value }, error) =>
        `Field '${name}' has Error '${
          error.type
        }'. Offending value: '${value}'. Original error message: ${
          error.message || "---"
        }`
      }
    >
      {renderFn?.(args, context)}
    </FormI18nProvider>
  );
};

type Story = StoryObj<typeof NumberInputField>;

export const Empty = {
  args: {
    useGrouping: true,
  },
} satisfies Story;

export const Prefilled = {
  parameters: {
    form: {
      initialValues: {
        theNumber: 123456.789,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const Readonly = {
  args: {
    readonly: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    ...Empty.args,
    required: true,
  },
} satisfies Story;

export const ValidationMin = {
  storyName: "Validation Min (4)",
  args: {
    ...Empty.args,
    min: 4,
  },
} satisfies Story;

export const ValidationMinMax = {
  storyName: "Validation MinMax (4-10)",
  args: {
    ...Empty.args,
    min: 4,
    max: 10,
  },
} satisfies Story;

export const ValidationTranslationRequired = {
  render: i18nStoryRenderer(meta.render),
  args: {
    ...ValidationRequired.args,
  },
} satisfies Story;

export const ValidationTranslationMin = {
  render: i18nStoryRenderer(meta.render),
  storyName: "Validation Translation Min (4)",
  args: {
    ...ValidationMin.args,
  },
} satisfies Story;

export const ValidationTranslationMinMax = {
  render: i18nStoryRenderer(meta.render),
  storyName: "Validation Translation MinMax (4-10)",
  args: {
    ...ValidationMinMax.args,
  },
} satisfies Story;

export const LocalizedDe = {
  render: i18nStoryRenderer(meta.render),
  storyName: "Localized DE MinMax (4-10)",
  args: {
    ...ValidationMinMax.args,
    locale: "de",
  },
} satisfies Story;
