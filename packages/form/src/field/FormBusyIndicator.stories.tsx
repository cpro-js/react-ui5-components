import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { SubmitHandler } from "react-hook-form";

import { FormController, FormControllerProps } from "../form/FormController";
import { FormBusyIndicator, FormBusyIndicatorProps } from "./FormBusyIndicator";
import { TextInputField } from "./TextInputField";

interface FormData {
  text?: string;
}

export default {
  title: "Form/Field/FormBusyIndicator",
  component: FormBusyIndicator,
  parameters: {
    form: {
      initialValues: {},
      onSubmit: (async (...args) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        action("submit")(...args);
      }) satisfies SubmitHandler<FormData>,
    },
  },
  render(props, context) {
    const { initialValues, onSubmit, ...formControllerProps } =
      context.parameters.form;

    return (
      <FormController<FormData>
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
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
  },
} satisfies Meta<typeof FormBusyIndicator>;

type Story = StoryObj<typeof FormBusyIndicator>;

export const Standard = {} satisfies Story;

export const ForcedBusyInactive = {
  args: {
    active: false,
  },
} satisfies Story;

export const ForcedBusyActive = {
  args: {
    active: true,
  },
} satisfies Story;
