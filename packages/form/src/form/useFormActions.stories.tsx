import "@ui5/webcomponents-icons/dist/search.js";

import { StoryFn } from "@storybook/react";
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

const TemplateFormActions: StoryFn<UseFormControllerProps<FormData>> = (
  props
) => {
  const { onSubmit, initialValues } = props;
  const { submittedValues, handleSubmit: onFormViewerSubmit } =
    useFormViewer<FormData>({
      onSubmit: onSubmit,
    });

  const form = useFormController<FormData>({
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
      <FormProvider<FormData> {...form}>
        <div>
          <Button type={"button"} onClick={updateValues}>
            Set Values
          </Button>
        </div>
        <TextInputField name={"value1"} />
        <TextInputField name={"value2"} />s
        <FormViewer<FormData> submittedValues={submittedValues} />
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
