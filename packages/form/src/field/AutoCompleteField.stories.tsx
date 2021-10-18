import { Story } from "@storybook/react";
import useState from "storybook-addon-state";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../component/auto-complete/AutoComplete-storyData";
import { AutoCompleteProps } from "../component/AutoComplete";
import { FormController, FormControllerProps } from "../FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { AutoCompleteField } from "./AutoCompleteField";
import { FormViewer } from "./FormViewer";
import { FormActions } from "./types";

interface FormData {
  item?: string | number;
}

const Template: Story<FormControllerProps<FormData> & AutoCompleteProps> = (
  args,
  context
) => {
  const { initialValues, onSubmit, ...props } = args;

  return (
    <FormViewer
      component={<AutoCompleteField {...props} name={"item"} />}
      initialValues={initialValues}
      storyName={context.name}
      //@ts-ignore
      onSubmitAction={onSubmit}
    />
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
