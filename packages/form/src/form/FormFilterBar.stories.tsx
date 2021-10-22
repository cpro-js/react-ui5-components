import "@ui5/webcomponents-icons/dist/search.js";

import { Story } from "@storybook/react";
import { FilterGroupItem, Icon } from "@ui5/webcomponents-react";

import { SelectItem } from "../component/Select";
import { CheckboxField } from "../field/CheckboxField";
import { CheckboxFieldGroup } from "../field/CheckboxFieldGroup";
import { DatePickerField } from "../field/DatePickerField";
import { FormValues } from "../field/FormValues";
import { MultiSelectField } from "../field/MultiSelectField";
import { SelectField } from "../field/SelectField";
import { TextInputField } from "../field/TextInputField";
import { FormController, FormControllerProps } from "./FormController";
import { FormFilterBar } from "./FormFilterBar";

const items: Array<SelectItem> = [
  { value: 1, label: "Test 1 Number" },
  { value: "1", label: "Test 1 String" },
  { value: "2", label: "Test 2" },
  { value: "3", label: "Test 3" },
  { value: "4", label: "Test 4" },
];

interface FormData {
  query?: string;
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
      <FormFilterBar
        showFilterConfiguration
        showGo
        showGoOnFB
        showClearButton
        showClearOnFB
        showRestoreButton
        showRestoreOnFB
        search={
          <TextInputField
            name="query"
            placeholder={"Search"}
            icon={<Icon name="search" />}
          />
        }
      >
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
      </FormFilterBar>
      <FormValues
        render={(values) => <div>{JSON.stringify(values, null, 2)}</div>}
      />
    </FormController>
  );
};

export const Standard = Template.bind({});
Standard.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = { initialValues: { input1: "test1", input2: "test2" } };

export default {
  title: "Form/Field/FormFilterBar",
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
