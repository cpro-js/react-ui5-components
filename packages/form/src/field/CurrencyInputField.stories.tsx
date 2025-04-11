import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import {
  CurrencyInputField,
  CurrencyInputFieldProps,
} from "./CurrencyInputField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldRef } from "./types";

interface FormData {
  theNumber?: number;
}

const meta = {
  title: "Form/Field/CurrencyInputField",
  component: CurrencyInputField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
  parameters: {
    form: {
      initialValues: {},
      onSubmit: action("onSubmit"),
    },
  },
  render(props, context) {
    const { initialValues, onSubmit, ...formControllerProps } =
      context.parameters.form;

    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: onSubmit,
    });
    const fieldRef = useRef<FormFieldRef<FormData, "theNumber">>(null);
    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <CurrencyInputField
          {...props}
          ref={fieldRef}
          name={"theNumber"}
          onSubmit={action("onSubmit")}
          onChange={action("onChange")}
        />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof CurrencyInputField>;

export default meta;

type Story = StoryObj<typeof CurrencyInputField>;

const I18nRenderer = (renderFn: typeof meta.render): typeof meta.render => {
  return (args, context) => (
    <FormI18nProvider
      getValidationErrorMessage={({ name }, error) =>
        `Field '${name}' has Error '${error.type}'. Original error: ${
          error.message || "---"
        }`
      }
    >
      {renderFn?.(args, context)}
    </FormI18nProvider>
  );
};

export const Empty = {
  args: { currency: "EUR" },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Empty.args,
  },
  parameters: {
    form: {
      initialValues: {
        theNumber: 10.29,
      },
    },
  },
} satisfies Story;

export const PrefilledAndRounded = {
  storyName: "Prefilled (10.299) and Rounded",
  args: {
    ...Empty.args,
  },
  parameters: {
    form: {
      initialValues: {
        theNumber: 10.299,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Empty.args,
    disabled: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const Readonly = {
  args: {
    ...Empty.args,
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
  storyName: "Validation Min (> 4)",
  args: {
    ...Empty.args,
    min: 4,
  },
} satisfies Story;

export const ValidationMinMax = {
  storyName: "Validation MinMax (4 - 10)",
  args: {
    ...Empty.args,
    min: 4,
    max: 10,
  },
} satisfies Story;

export const ValidationTranslationRequired = {
  render: I18nRenderer(meta.render),
  args: {
    ...Empty.args,
    required: true,
  },
} satisfies Story;

export const ValidationTranslationMin = {
  render: I18nRenderer(meta.render),
  storyName: "Validation Translation Min (min: 4c)",
  args: {
    ...ValidationMin.args,
  },
} satisfies Story;

export const ValidationTranslationMinMax = {
  render: I18nRenderer(meta.render),
  storyName: "Validation Translation (min: 4, max: 10)",
  args: {
    ...ValidationMinMax.args,
  },
} satisfies Story;

export const LocalizedDe = {
  render: I18nRenderer(meta.render),
  storyName: "Localized DE",
  args: {
    ...Empty.args,
    locale: "de",
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const LocalizedDeMinMax = {
  render: I18nRenderer(meta.render),
  storyName: "Localized Min Max DE (min: 4, max: 10)",
  args: {
    ...ValidationMinMax.args,
    locale: "de",
  },
} satisfies Story;
