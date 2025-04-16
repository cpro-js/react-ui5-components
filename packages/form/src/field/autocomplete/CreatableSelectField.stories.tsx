import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { COUNTRIES } from "../../component/autocomplete/AutoComplete-storyData";
import { DefaultAutoCompleteOption } from "../../component/autocomplete/internal/CoreAutocomplete";
import { FormController, FormControllerProps } from "../../form/FormController";
import { FormI18nProvider } from "../../i18n/FormI18n";
import { FormViewer, useFormViewer } from "../FormViewer";
import { FormFieldRef } from "../types";
import {
  CreatableSelectField,
  CreatableSelectFieldProps,
} from "./CreatableSelectField";

interface FormData {
  item?: string | number;
}

const meta = {
  title: "Form/Field/Autocomplete/CreatableSelectField",
  component: CreatableSelectField,
  parameters: {
    form: {
      initialValues: {},
      onSubmit: action("form-submit"),
    },
  },
  render(props, context) {
    const { initialValues, onSubmit, ...formControllerProps } =
      context.parameters.form;

    const { submittedValues, handleSubmit } = useFormViewer({
      onSubmit: onSubmit,
    });
    const fieldRef = useRef<FormFieldRef<FormData, "item">>(null);

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <CreatableSelectField {...props} ref={fieldRef} name="item" />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof CreatableSelectField>;

export default meta;

type Story = StoryObj<typeof CreatableSelectField>;

export const Standard = {
  args: {
    items: COUNTRIES,
  },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Standard.args,
  },
  parameters: {
    form: {
      initialValues: {
        item: COUNTRIES[1].value,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Standard.args,
    disabled: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const Readonly = {
  args: {
    ...Standard.args,
    readonly: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    ...Standard.args,
    required: true,
  },
} satisfies Story;

export const ValidationTranslationRequired = {
  render: (args, context) => (
    <FormI18nProvider
      getValidationErrorMessage={({ name }, error) =>
        `Field '${name}' has Error '${error.type}'. Original error: ${
          error.message || "---"
        }`
      }
    >
      {meta.render?.(args, context)}
    </FormI18nProvider>
  ),
  args: {
    ...ValidationRequired.args,
  },
} satisfies Story;
