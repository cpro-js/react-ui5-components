import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormBusyIndicator, FormBusyIndicatorProps } from "./FormBusyIndicator";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

const Template: StoryFn<
  FormControllerProps<FormData> & FormBusyIndicatorProps<FormData>
> = (args) => {
  const { initialValues, onSubmit, ...props } = args;

  return (
    <FormController<FormData> initialValues={initialValues} onSubmit={onSubmit}>
      <FormBusyIndicator {...props}>
        <TextInputField name={"text"} />
        <div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
        <div>Submit to see busy state</div>
      </FormBusyIndicator>
    </FormController>
  );
};

export const Standard = Template.bind({});
Standard.args = {
  onSubmit: async (...args) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    action("submit")(...args);
  },
};

export const ForcedBusyInactive = Template.bind({});
ForcedBusyInactive.args = {
  active: false,
  onSubmit: async (...args) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    action("submit")(...args);
  },
};

export const ForcedBusyActive = Template.bind({});
ForcedBusyActive.args = {
  active: true,
  onSubmit: async (...args) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    action("submit")(...args);
  },
};

export default {
  title: "Form/Field/FormBusyIndicator",
  component: FormBusyIndicator,
};
