import { StoryFn } from "@storybook/react";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormViewer, useFormViewer } from "./FormViewer";
import { RadioButtonField, RadioButtonFieldProps } from "./RadioButtonField";
import { FormFieldRef } from "./types";

interface FormData {
  value?: string;
}

const createTemplate = function <T extends {}>(): StoryFn<
  FormControllerProps<T> & RadioButtonFieldProps<FormData, "value">
> {
  return (args) => {
    const { initialValues, onSubmit, ...props } = args;

    const { submittedValues, handleSubmit } = useFormViewer<T>({
      onSubmit: onSubmit,
    });
    const fieldRef = useRef<FormFieldRef<FormData, "value">>(null);

    return (
      <FormController<T> {...{ initialValues, onSubmit: handleSubmit }}>
        <RadioButtonField
          {...props}
          name="value"
          value="cake"
          text={"Cake"}
          ref={fieldRef}
        />
        <RadioButtonField
          {...props}
          name="value"
          value="waffles"
          text={"Waffles"}
        />
        <RadioButtonField
          {...props}
          name="value"
          value="burger"
          text={"Burger"}
        />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  };
};

const Template = createTemplate<FormData>();

export const Empty = Template.bind({});
Empty.args = {};

export const Prefilled = Template.bind({});
Prefilled.args = {
  ...Empty.args,
  initialValues: {
    value: "waffles",
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
  required: true,
};

export default {
  title: "Form/Field/RadioButtonField",
  component: RadioButtonField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
