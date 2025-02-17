import { StoryFn } from "@storybook/react";
import { useRef } from "react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../component/autocomplete/AutoComplete-storyData";
import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import {
  MultiAutoCompleteField,
  MultiAutoCompleteFieldProps,
} from "./MultiAutoCompleteField";
import { FormFieldElement } from "./types";

interface FormData {
  items?: Array<string>;
}

const Template: StoryFn<
  FormControllerProps<FormData> & MultiAutoCompleteFieldProps<FormData, "items">
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });
  const fieldRef = useRef<FormFieldElement<FormData, "items">>(null);

  return (
    <FormController<FormData> {...{ initialValues, onSubmit: handleSubmit }}>
      <MultiAutoCompleteField {...props} ref={fieldRef} name={"items"} />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>
  );
};

const I18nTemplate: StoryFn<
  FormControllerProps<FormData> & MultiAutoCompleteFieldProps<FormData, "items">
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

export const Standard = Template.bind({});
Standard.args = { onSearch: SEARCH_COUNTRIES };

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  initialSuggestions: [COUNTRIES[1], COUNTRIES[3]],
  initialValues: {
    items: [COUNTRIES[1].value, COUNTRIES[3].value],
  },
};

export const PrefilledAndDisabled = Template.bind({});
PrefilledAndDisabled.args = {
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
  ...Standard.args,
  required: true,
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  ...ValidationRequired.args,
};

export default {
  title: "Form/Field/MultiAutoCompleteField",
  component: MultiAutoCompleteField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
