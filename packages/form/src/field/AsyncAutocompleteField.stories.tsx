import { Story } from "@storybook/react";
import useState from "storybook-addon-state";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../component/auto-complete/AutoComplete-storyData";
import { DefaultAutoCompleteOption } from "../component/auto-complete/internal/CoreAutocomplete";
import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import {
  AsyncAutocompleteField,
  AsyncAutocompleteFieldProps,
} from "./AsyncAutocompleteField";
import { FormActions } from "./types";

interface FormData {
  item?: string | number;
}

const Template: Story<
  FormControllerProps<FormData> &
    AsyncAutocompleteFieldProps<DefaultAutoCompleteOption>
> = (args, context) => {
  const { initialValues, ...props } = args;

  const [submittedValues, setSubmittedValues] = useState(
    `${context.name}_submittedValues`,
    {}
  );
  const NoData = <p>No submitted data yet!</p>;

  const onSubmit = (values: FormData, actions: FormActions<FormData>) => {
    setSubmittedValues(values);
  };

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <AsyncAutocompleteField {...props} name="item" />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>

      <h2>Submitted Values</h2>
      {!Object.keys(submittedValues).length
        ? NoData
        : JSON.stringify(submittedValues)}
    </FormController>
  );
};

const I18nTemplate: Story<
  FormControllerProps<FormData> &
    AsyncAutocompleteFieldProps<DefaultAutoCompleteOption>
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

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  defaultItems: [COUNTRIES[1]],
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
  title: "Form/Field/AsyncAutocompleteField",
  component: AsyncAutocompleteField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
