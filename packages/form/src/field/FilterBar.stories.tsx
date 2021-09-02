import { Story } from "@storybook/react";
import { FilterBar, FilterGroupItem } from "@ui5/webcomponents-react";

import { SelectItem } from "../component/Select";
import { FormController, FormControllerProps } from "../FormController";
import { CheckboxField } from "./CheckboxField";
import { CheckboxFieldGroup } from "./CheckboxFieldGroup";
import { DatePickerField } from "./DatePickerField";
import { MultiSelectField } from "./MultiSelectField";
import { SelectField } from "./SelectField";
import { TextInputField } from "./TextInputField";

const items: Array<SelectItem> = [
  { value: 1, label: "Test 1 Number" },
  { value: "1", label: "Test 1 String" },
  { value: "2", label: "Test 2" },
  { value: "3", label: "Test 3" },
  { value: "4", label: "Test 4" },
];

interface FormData {
  input1?: string;
  input2?: string;
  date?: Date;
  select?: string;
  multiSelect?: Array<string>;
  dish?: Array<string>;
}

const Template: Story<FormControllerProps<FormData>> = (args) => {
  const { initialValues, onSubmit } = args;

  return (
    <FormController<FormData> {...{ initialValues, onSubmit }}>
      <FilterBar showFilterConfiguration>
        <FilterGroupItem label="Input">
          <TextInputField name="input1" required />
        </FilterGroupItem>
        <FilterGroupItem label="Input2">
          <TextInputField name="input2" required />
        </FilterGroupItem>
        <FilterGroupItem label="Date">
          <DatePickerField name="date" />
        </FilterGroupItem>
        <FilterGroupItem label="Select">
          <SelectField name="select" items={items} />
        </FilterGroupItem>

        <FilterGroupItem label="MultiSelect">
          <MultiSelectField name="multiSelect" items={items} />
        </FilterGroupItem>

        <FilterGroupItem label="Checkboxes">
          <CheckboxFieldGroup name="dish">
            <CheckboxField value="cake" text={"Cake"} />
            <CheckboxField value="waffles" text={"Waffles"} />
            <CheckboxField value="burger" text={"Burger"} />
          </CheckboxFieldGroup>
        </FilterGroupItem>
      </FilterBar>
    </FormController>
  );
};

export const Standard = Template.bind({});
Standard.args = {};

export default {
  title: "Form/Field/FilterBar",
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
