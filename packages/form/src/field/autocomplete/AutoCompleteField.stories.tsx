import { StoryFn } from "@storybook/react";
import { useRef } from "react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../../component/autocomplete/AutoComplete-storyData";
import { DefaultAutoCompleteOption } from "../../component/autocomplete/internal/CoreAutocomplete";
import { FormController, FormControllerProps } from "../../form/FormController";
import { FormI18nProvider } from "../../i18n/FormI18n";
import { FormViewer, useFormViewer } from "../FormViewer";
import { FormFieldRef } from "../types";
import { AutoCompleteField, AutoCompleteFieldProps } from "./AutoCompleteField";

interface FormData {
  item?: string | number;
}

const Template: StoryFn<
  FormControllerProps<FormData> &
    AutoCompleteFieldProps<FormData, "item", DefaultAutoCompleteOption>
> = (args, context) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });
  const fieldRef = useRef<FormFieldRef<FormData, "item">>(null);

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <AutoCompleteField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>
  );
};

const I18nTemplate: StoryFn<
  FormControllerProps<FormData> &
    AutoCompleteFieldProps<FormData, "item", DefaultAutoCompleteOption>
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
Standard.args = { loadItems: SEARCH_COUNTRIES };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  initialItems: [COUNTRIES[1]],
  initialValues: {
    item: COUNTRIES[1].value,
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
  ...Standard.args,
  required: true,
};

export const ValidationTranslationRequired = I18nTemplate.bind({});
ValidationTranslationRequired.args = {
  ...ValidationRequired.args,
};

export default {
  title: "Form/Field/Autocomplete/AutoCompleteField",
  component: AutoCompleteField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
