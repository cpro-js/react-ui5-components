import "@ui5/webcomponents-icons/dist/search.js";

import { Story } from "@storybook/react";
import { useCallback } from "react";

import { Button } from "../component/Button";
import { FormViewer, useFormViewer } from "../field/FormViewer";
import { TextInputField } from "../field/TextInputField";
import { FormProvider } from "./FormProvider";
import { UseFormControllerProps, useFormController } from "./useFormController";

interface FormData {
  value1: string;
  value2: string;
}

const TemplateFormActions: Story<UseFormControllerProps<FormData>> = (
  props
) => {
  const { onSubmit, initialValues } = props;
  const { submittedValues, handleSubmit: onFormViewerSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });

  const form = useFormController({
    onSubmit: onFormViewerSubmit,
    initialValues: initialValues,
  });
  const { handleSubmit, handleReset, setValues } = form;

  const updateValues = useCallback(() => {
    setValues(
      [
        { name: "value1", value: Date.now().toString() },
        { name: "value2", value: Date.now().toString() },
      ],
      {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      }
    );
  }, [setValues]);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <FormProvider {...form}>
        <div>
          <Button type={"button"} onClick={updateValues}>
            Set Values
          </Button>
        </div>
        <TextInputField name={"value1"} />
        <TextInputField name={"value2"} />s
        <FormViewer submittedValues={submittedValues} />
      </FormProvider>
    </form>
  );
};

export const SetValuesAsDirty = TemplateFormActions.bind({});
SetValuesAsDirty.args = {};

export default {
  title: "Form/useFormActions",
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
};
