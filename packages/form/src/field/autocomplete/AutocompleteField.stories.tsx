import { Story } from "@storybook/react";

import { COUNTRIES } from "../../component/auto-complete/AutoComplete-storyData";
import { DefaultAutoCompleteOption } from "../../component/auto-complete/internal/CoreAutocomplete";
import { FormController, FormControllerProps } from "../../form/FormController";
import { FormI18nProvider } from "../../i18n/FormI18n";
import { FormViewer, useFormViewer } from "../FormViewer";
import { AutocompleteField, AutocompleteFieldProps } from "./AutocompleteField";

interface FormData {
  item?: string | number;
}

const Template: Story<
  FormControllerProps<FormData> &
    AutocompleteFieldProps<DefaultAutoCompleteOption>
> = (args, context) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <AutocompleteField {...props} name="item" />
      <FormViewer submittedValues={submittedValues} />
    </FormController>
  );
};

const I18nTemplate: Story<
  FormControllerProps<FormData> &
    AutocompleteFieldProps<DefaultAutoCompleteOption>
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
Standard.args = {
  items: COUNTRIES,
};

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
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
  title: "Form/Field/Autocomplete/AutocompleteField",
  component: AutocompleteField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
