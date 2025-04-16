import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import {
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Form,
  FormItem,
  Label,
  Text,
} from "@ui5/webcomponents-react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../component/autocomplete/AutoComplete-storyData";
import { Button } from "../component/Button";
import { FormController, FormControllerProps } from "../form/FormController";
import { CheckboxField } from "./CheckboxField";
import { CheckboxFieldGroup } from "./CheckboxFieldGroup";
import { DatePickerField } from "./DatePickerField";
import { HiddenField } from "./HiddenField";
import { NumberInputField } from "./NumberInputField";
import { TextAreaField } from "./TextAreaField";
import { TextInputField } from "./TextInputField";
import {
  AutoCompleteField,
  MultiAutoCompleteField,
  toISO8601DateString,
} from "..";

interface FormData {
  id?: string;
  input1?: string;
  input2?: string;
  textarea?: string;
  numberinput?: number;
  date?: string;
  dish?: Array<string>;
  country: string;
  countries: Array<string>;
}

interface ExtraData {
  initialCurrentCountrySuggestions?: typeof COUNTRIES;
  initialCountriesSuggestions?: typeof COUNTRIES;
}

export default {
  title: "Form/Field/Form",
  argTypes: {
    onChange: {
      action: "onChange",
    },
    onFieldChange: {
      action: "onFieldChange",
    },
    onFieldSubmit: {
      action: "onFieldSubmit",
    },
  },
  render: (args) => {
    const {
      initialCurrentCountrySuggestions,
      initialCountriesSuggestions,
      id,
      ...formControllerProps
    } = args;
    return (
      <>
        <FormController<FormData> {...formControllerProps} id={id}>
          <HiddenField name="id" />
          <Form>
            <FormItem labelContent={<Label>Text</Label>}>
              <Text> Test</Text>
            </FormItem>
            <FormItem labelContent={<Label>Input</Label>}>
              <TextInputField name="input1" />
            </FormItem>
            <FormItem labelContent={<Label>Input2</Label>}>
              <TextInputField name="input2" />
            </FormItem>
            <FormItem labelContent={<Label>Date</Label>}>
              <DatePickerField name="date" />
            </FormItem>
            <FormItem labelContent={<Label>Checkboxes</Label>}>
              <FlexBox
                direction={FlexBoxDirection.Column}
                justifyContent={FlexBoxJustifyContent.Start}
              >
                <CheckboxFieldGroup name="dish">
                  <CheckboxField
                    value="cake"
                    text={"Cake"}
                    style={{ marginRight: "auto" }}
                  />
                  <CheckboxField
                    value="waffles"
                    text={"Waffles"}
                    style={{ marginRight: "auto" }}
                  />
                  <CheckboxField
                    value="burger"
                    text={"Burger"}
                    style={{ marginRight: "auto" }}
                  />
                </CheckboxFieldGroup>
              </FlexBox>
            </FormItem>
            <FormItem labelContent={<Label>Current Country</Label>}>
              <AutoCompleteField
                name="country"
                loadItems={SEARCH_COUNTRIES}
                initialItems={initialCurrentCountrySuggestions}
              />
            </FormItem>
            <FormItem labelContent={<Label>Text Area</Label>}>
              <TextAreaField name="textarea" />
            </FormItem>
            <FormItem labelContent={<Label>Number Input</Label>}>
              <NumberInputField name="numberinput" />
            </FormItem>
            <FormItem labelContent={<Label>Visitied Countries</Label>}>
              <MultiAutoCompleteField
                name="countries"
                onSearch={SEARCH_COUNTRIES}
                initialSuggestions={initialCountriesSuggestions}
              />
            </FormItem>
            <FormItem
              labelContent={<Label>Hierarchical Checkboxes (via name)</Label>}
            >
              <CheckboxField name="root.selected" boolean />
              <CheckboxField name="root.test.selected" boolean />
            </FormItem>
            <FormItem>
              <FlexBox alignItems="Baseline" justifyContent="Start">
                <Button type="submit">Inner submit button</Button>
                <Button type="reset">Inner reset button</Button>
              </FlexBox>
            </FormItem>
          </Form>
        </FormController>
        <Button type="submit" form={id}>
          External submit button
        </Button>
        <Button type="reset" form={id}>
          External reset button
        </Button>
      </>
    );
  },
} satisfies Meta<FormControllerProps<FormData> & ExtraData>;

type Story = StoryObj<FormControllerProps<FormData> & ExtraData>;

export const Standard = {
  args: {
    id: "my-form",
  },
} satisfies Story;

export const Prefilled = {
  args: {
    id: "my-form",
    initialValues: {
      id: "my-id",
      input1: "Text 1",
      input2: "Text 2",
      textarea: "Text",
      numberinput: 10,
      date: toISO8601DateString(new Date()),
      dish: ["burger"],
      country: "BG",
      countries: ["FI", "GB"],
    },
    initialCurrentCountrySuggestions: [COUNTRIES[1]],
    initialCountriesSuggestions: [COUNTRIES[2], COUNTRIES[3]],
  },
} satisfies Story;

export const SubmitErrors = {
  args: {
    ...Prefilled.args,
    onSubmit: (values, actions) => {
      action("onsubmit")(values, actions);

      actions.setErrors([
        { name: "input1", message: "Custom error from submit: input1" },
        { name: "date", message: "Custom error from submit: date" },
        { name: "textarea", message: "Custome error from submit: textarea" },
        { name: "numberinput", message: "Custom error from submit: textarea" },
      ]);
    },
  },
} satisfies Story;

export const SubmitErrorsFocus = {
  args: {
    ...Prefilled.args,
    onSubmit: (values, actions) => {
      action("onsubmit")(values, actions);

      actions.setErrors(
        [
          { name: "input1", message: "Custom error from submit: input1" },
          { name: "date", message: "Custom error from submit: date" },
          { name: "textarea", message: "Custome error from submit: textarea" },
          {
            name: "numberinput",
            message: "Custom error from submit: textarea",
          },
        ],
        { shouldFocus: true }
      );
    },
  },
} satisfies Story;

export const ResetFormOnSubmit = {
  args: {
    ...Prefilled.args,
    onSubmit: (values, actions) => {
      action("onsubmit")(values, actions);
      actions.reset();
    },
  },
} satisfies Story;

export const SetValuesOnSubmit = {
  args: {
    ...Prefilled.args,
    onSubmit: (values, actions) => {
      action("onsubmit")(values, actions);
      actions.setValues([
        { name: "date", value: "1990-01-10" },
        { name: "input1", value: "New Value" },
        { name: "textarea", value: "New Value" },
        { name: "numberinput", value: 25 },
      ]);
    },
  },
} satisfies Story;

export const SetValueOnChange = {
  args: {
    ...Prefilled.args,
    onChange: (values, actions) => {
      action("change")(values, actions);

      if (values.input1 !== values.input2) {
        actions.setValues([{ name: "input2", value: values.input1 }]);
      }
    },
  },
} satisfies Story;
