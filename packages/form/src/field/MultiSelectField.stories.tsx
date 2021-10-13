import { Story } from "@storybook/react";

import { MultiSelectItem } from "../component/MultiSelect";
import { FormController, FormControllerProps } from "../FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { MultiSelectField, MultiSelectFieldProps } from "./MultiSelectField";

export interface MultiSelectItemAlt extends MultiSelectItem {
  alt: string;
}

const items: Array<MultiSelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
];

interface FormData {
  item?: Array<string | number>;
}

const Template: Story<FormControllerProps<FormData> & MultiSelectFieldProps> = (
  args
) => {
  const { initialValues, onSubmit, ...props } = args;
  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <MultiSelectField {...props} name="item" />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </FormController>
  );
};

const I18nTemplate: Story<
  FormControllerProps<FormData> & MultiSelectFieldProps
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
Empty.args = {};

export const Standard = Template.bind({});
Standard.args = {
  items,
};

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Standard.args,
  initialValues: {
    item: [items[1].value],
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

const TemplateAlt: Story<
  FormControllerProps<FormData> & MultiSelectFieldProps<MultiSelectItemAlt>
> = (args, context) => {
  const { initialValues, onSubmit, ...props } = args;
  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <MultiSelectField<MultiSelectItemAlt> {...props} name="item" />
      <div>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </FormController>
  );
};

export const WithItemLabel = TemplateAlt.bind({});
WithItemLabel.args = { ...Standard.args, itemLabel: "alt" };

export const WithItemValue = TemplateAlt.bind({});
WithItemValue.args = { ...Standard.args, itemValue: "alt" };

export default {
  title: "Form/Field/MultiSelectField",
  component: MultiSelectField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
