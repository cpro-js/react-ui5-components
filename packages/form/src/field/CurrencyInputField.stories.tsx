import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
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

const Template: StoryFn<
  FormControllerProps<FormData> & CurrencyInputFieldProps<FormData, "theNumber">
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer<FormData>({
    onSubmit: onSubmit,
  });
  const fieldRef = useRef<FormFieldRef<FormData, "theNumber">>(null);

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
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
};

const I18nTemplate: StoryFn<
  FormControllerProps<FormData> & CurrencyInputFieldProps<FormData, "theNumber">
> = (args, context) => {
  return (
    <FormI18nProvider
      getValidationErrorMessage={({ name }, error) => {
        return `Field '${name}' has Error '${
          error.type
        }'. Original error message: ${error.message || "---"}`;
      }}
    >
      {Template(args, context)}
    </FormI18nProvider>
  );
};

export const Empty = Template.bind({});
Empty.args = { currency: "EUR" };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Empty.args,
  initialValues: {
    theNumber: 10.29,
  },
};

export const PrefilledAndRounded = Template.bind({});
PrefilledAndRounded.storyName = "Prefilled (10.299) and Rounded";
PrefilledAndRounded.args = {
  ...Empty.args,
  initialValues: {
    theNumber: 10.299,
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Prefilled.args,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Prefilled.args,
  readonly: true,
};

export const ValidationRequired = Template.bind({});
ValidationRequired.args = {
  ...Empty.args,
  required: true,
};

export const ValidationMin = Template.bind({});
ValidationMin.storyName = "Validation Min (> 4)";
ValidationMin.args = {
  ...Empty.args,
  min: 4,
};

export const ValidationMinMax = Template.bind({});
ValidationMinMax.storyName = "Validation MinMax (4 - 10)";
ValidationMinMax.args = {
  ...Empty.args,
  min: 4,
  max: 10,
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  ...ValidationRequired.args,
};

export const ValidationTranslationMin = I18nTemplate.bind({});
ValidationTranslationMin.storyName = "Validation Translation Min (min: 4c)";
ValidationTranslationMin.args = {
  ...ValidationMin.args,
};

export const ValidationTranslationMinMax = I18nTemplate.bind({});
ValidationTranslationMinMax.storyName =
  "Validation Translation (min: 4, max: 10)";
ValidationTranslationMinMax.args = {
  ...ValidationMinMax.args,
};

export const LocalizedDe = I18nTemplate.bind({});
LocalizedDe.storyName = "Localized DE";
LocalizedDe.args = {
  ...Prefilled.args,
  locale: "de",
};

export const LocalizedDeMinMax = I18nTemplate.bind({});
LocalizedDeMinMax.storyName = "Localized Min Max DE (min: 4, max: 10)";
LocalizedDeMinMax.args = {
  ...ValidationMinMax.args,
  locale: "de",
};

export default {
  title: "Form/Field/CurrencyInputField",
  component: CurrencyInputField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
