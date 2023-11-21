import { Story } from "@storybook/react";
import { useRef } from "react";

import { FormController, FormControllerProps } from "../form/FormController";
import { CheckboxField, CheckboxFieldProps } from "./CheckboxField";
import { FormViewer, useFormViewer } from "./FormViewer";
import { FormFieldElement } from "./types";

interface FormData {
  value?: string;
}

interface FormDataBoolean {
  value?: boolean;
}

const createTemplate = function <T>(): Story<
  FormControllerProps<T> & CheckboxFieldProps
> {
  return (args) => {
    const { initialValues, onSubmit, ...props } = args;

    const { submittedValues, handleSubmit } = useFormViewer<T>({
      onSubmit: onSubmit,
    });
    const fieldRef = useRef<FormFieldElement>(null);

    return (
      <FormController {...{ initialValues, onSubmit: handleSubmit }}>
        <CheckboxField {...props} ref={fieldRef} name={"value"} />
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
    value: "on",
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

const TemplateBoolean = createTemplate<FormDataBoolean>();

export const BooleanEmpty = TemplateBoolean.bind({});
BooleanEmpty.args = {
  boolean: true,
};

export const BooleanPrefilled = TemplateBoolean.bind({});
BooleanPrefilled.args = {
  ...BooleanEmpty.args,
  initialValues: {
    value: true,
  },
};

export const BooleanDisabled = TemplateBoolean.bind({});
BooleanDisabled.args = {
  ...BooleanPrefilled.args,
  disabled: true,
};

export const BooleanReadonly = TemplateBoolean.bind({});
BooleanReadonly.args = {
  ...BooleanPrefilled.args,
  readonly: true,
};

export const BooleanValidationRequired = TemplateBoolean.bind({});
BooleanValidationRequired.args = {
  ...BooleanEmpty.args,
  required: true,
};

export default {
  title: "Form/Field/CheckboxField",
  component: CheckboxField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
