import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useRef } from "react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../../component/autocomplete/AutoComplete-storyData";
import { DefaultAutoCompleteOption } from "../../component/autocomplete/internal/CoreAutocomplete";
import { FormController, FormControllerProps } from "../../form/FormController";
import { FormI18nProvider } from "../../i18n/FormI18n";
import { FormViewer, useFormViewer } from "../FormViewer";
import { FormFieldRef } from "../types";
import {
  CreatableAutoCompleteField,
  CreatableAutoCompleteFieldProps,
} from "./CreatableAutoCompleteField";

interface FormData {
  item?: string | number;
}

const meta = {
  title: "Form/Field/Autocomplete/CreatableAutoCompleteField",
  component: CreatableAutoCompleteField,
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
        <CreatableAutoCompleteField {...props} ref={fieldRef} name="item" />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof CreatableAutoCompleteField>;

export default meta;

type Story = StoryObj<typeof CreatableAutoCompleteField>;

const Template: StoryFn<
  FormControllerProps<FormData> &
    CreatableAutoCompleteFieldProps<FormData, "item", DefaultAutoCompleteOption>
> = (args, context) => {
  const { initialValues, onSubmit, ...props } = args;

  const { submittedValues, handleSubmit } = useFormViewer({
    onSubmit: onSubmit,
  });
  const fieldRef = useRef<FormFieldRef<FormData, "item">>(null);

  return (
    <FormController {...{ initialValues, onSubmit: handleSubmit }}>
      <CreatableAutoCompleteField {...props} ref={fieldRef} name="item" />
      <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
    </FormController>
  );
};

const I18nTemplate: StoryFn<
  FormControllerProps<FormData> &
    CreatableAutoCompleteFieldProps<FormData, "item", DefaultAutoCompleteOption>
> = (args, context) => {
  return (
    <FormI18nProvider
      getValidationErrorMessage={({ name }, error) => {
        return `Field '${name}' has Error '${
          error.type
        }'. Original error message: ${error.message || "---"}`;
      }}
    >
      {Template(args, context)}
    </FormI18nProvider>
  );
};

export const Standard = {
  args: {
    loadItems: SEARCH_COUNTRIES,
  },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Standard.args,
    initialItems: [COUNTRIES[1]],
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
    ...Prefilled.args,
    disabled: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const Readonly = {
  args: {
    ...Prefilled.args,
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
