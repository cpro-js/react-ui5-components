import { Story } from "@storybook/react";
import {
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Form,
  FormItem,
  Text,
  Toolbar,
  ToolbarSpacer,
} from "@ui5/webcomponents-react";

import { Button } from "../component/Button";
import { FormController, FormControllerProps } from "../FormController";
import { CheckboxField } from "./CheckboxField";
import { CheckboxFieldGroup } from "./CheckboxFieldGroup";
import { DatePickerField } from "./DatePickerField";
import { HiddenField } from "./HiddenField";
import { TextInputField } from "./TextInputField";

interface FormData {
  id?: string;
  input1?: string;
  input2?: string;
  date?: Date;
  dish?: Array<string>;
}

const Template: Story<FormControllerProps<FormData>> = (args) => {
  const { initialValues, onSubmit, id } = args;

  return (
    <>
      <FormController<FormData> {...{ initialValues, onSubmit, id }}>
        <HiddenField name="id" />
        <Form>
          <FormItem label="Text">
            <Text> Test</Text>
          </FormItem>
          <FormItem label="Input">
            <TextInputField name="input1" />
          </FormItem>
          <FormItem label="Input2">
            <TextInputField name="input2" />
          </FormItem>
          <FormItem label="Date">
            <DatePickerField name="date" />
          </FormItem>
          <FormItem label="Checkboxes">
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
          <FormItem>
            <Toolbar>
              <ToolbarSpacer />
              <Button type="submit">Inner submit button</Button>
              <Button type="reset">Inner reset button</Button>
            </Toolbar>
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
};

export const Standard = Template.bind({});
Standard.args = {
  id: "my-form",
};

export const Prefilled = Template.bind({});
Prefilled.args = {
  id: "my-form",
  initialValues: {
    id: "my-id",
    input1: "Text 1",
    input2: "Text 2",
    date: new Date(),
    dish: ["burger"],
  },
};

export default {
  title: "Form/Field/Form",
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
