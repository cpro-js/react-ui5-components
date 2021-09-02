import { Story } from "@storybook/react";

import { MultiSelectItem } from "../component/MultiSelect";
import { FormController, FormControllerProps } from "../FormController";
import { MultiSelectField, MultiSelectFieldProps } from "./MultiSelectField";

const items: Array<MultiSelectItem> = [
  { value: 1, label: "Test 1 Number" },
  { value: "1", label: "Test 1 String" },
  { value: "2", label: "Test 2" },
  { value: "3", label: "Test 3" },
  { value: "4", label: "Test 4" },
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

export default {
  title: "Form/Field/MultiSelectField",
  component: MultiSelectField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
