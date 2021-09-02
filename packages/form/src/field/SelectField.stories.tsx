import { Story } from "@storybook/react";

import { SelectItem } from "../component/Select";
import { FormController, FormControllerProps } from "../FormController";
import { SelectField, SelectFieldProps } from "./SelectField";

const items: Array<SelectItem> = [
  { value: 1, label: "Test 1 Number" },
  { value: "1", label: "Test 1 String" },
  { value: "2", label: "Test 2" },
  { value: "3", label: "Test 3" },
  { value: "4", label: "Test 4" },
];

interface FormData {
  item?: string | number;
}

const Template: Story<FormControllerProps<FormData> & SelectFieldProps> = (
  args,
  context
) => {
  const { initialValues, onSubmit, ...props } = args;
  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <SelectField {...props} name="item" />
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

export const WithEmptyOption = Template.bind({});
WithEmptyOption.args = { ...Standard.args, addEmptyOption: true };

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...WithEmptyOption.args,
  initialValues: {
    item: items[1].value,
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
  ...WithEmptyOption.args,
  required: true,
};

export default {
  title: "Form/Field/SelectField",
  component: SelectField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
