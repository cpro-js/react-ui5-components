import { Story } from "@storybook/react";
import { FormEvent, useState } from "react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../component/auto-complete/AutoComplete-storyData";
import { AutoCompleteProps } from "../component/AutoComplete";
import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { AutoCompleteField } from "./AutoCompleteField";
import { FormViewer } from "./FormViewer";

interface FormData {
  item?: string | number;
}

const Template: Story<FormControllerProps<FormData> & AutoCompleteProps> = (
  args
) => {
  const { initialValues, ...props } = args;
  const onSubmitAction = args.onSubmit;

  const [submittedValues, setSubmittedValues] = useState({});

  const onSubmit = (values: FormData & FormEvent<HTMLElement>) => {
    setSubmittedValues(values);
    onSubmitAction(values);
  };

  const getSubmittedValues = () => {
    return submittedValues;
  };

  return (
    <FormController<FormData & FormEvent<HTMLElement>>
      {...{ initialValues, onSubmit }}
    >
      <AutoCompleteField {...props} name={"item"} />
      <FormViewer getSubmittedValues={getSubmittedValues} />
    </FormController>
  );
};

const I18nTemplate: Story<FormControllerProps<FormData> & AutoCompleteProps> = (
  args,
  context
) => {
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
Standard.args = { value: undefined, onSearch: SEARCH_COUNTRIES };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  initialSuggestions: [COUNTRIES[1]],
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
  title: "Form/Field/AutoCompleteField",
  component: AutoCompleteField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
