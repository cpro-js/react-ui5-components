import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormBusyIndicator, FormBusyIndicatorProps } from "./FormBusyIndicator";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

const Template: Story<FormControllerProps<FormData> & FormBusyIndicatorProps> =
  (args) => {
    const { initialValues, onSubmit, ...props } = args;

    return (
      <FormController<FormData> {...{ initialValues, onSubmit }}>
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
  busy: false,
  onSubmit: async (...args) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    action("submit")(...args);
  },
};

export const ForcedBusyActive = Template.bind({});
ForcedBusyActive.args = {
  busy: true,
  onSubmit: async (...args) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    action("submit")(...args);
  },
};

export default {
  title: "Form/Field/FormBusyIndicator",
  component: FormBusyIndicator,
};
