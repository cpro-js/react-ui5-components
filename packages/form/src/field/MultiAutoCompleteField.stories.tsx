import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useRef } from "react";

import {
  COUNTRIES,
  SEARCH_COUNTRIES,
} from "../component/autocomplete/AutoComplete-storyData";
import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import {
  MultiAutoCompleteField,
  MultiAutoCompleteFieldProps,
} from "./MultiAutoCompleteField";
import { FormFieldRef } from "./types";

interface FormData {
  items?: Array<string>;
}

const meta = {
  title: "Form/Field/MultiAutoCompleteField",
  component: MultiAutoCompleteField,
  parameters: {
    form: {
      initialValues: {},
      onSubmit: action("form-submit"),
    },
  },
  render(props, context) {
    const { initialValues, onSubmit, ...formControllerProps } =
      context.parameters.form;

    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit,
    });

    const fieldRef = useRef<FormFieldRef<FormData, "items">>(null);

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <MultiAutoCompleteField {...props} ref={fieldRef} name="items" />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof MultiAutoCompleteField>;

export default meta;

type Story = StoryObj<typeof MultiAutoCompleteField>;

export const Standard = {
  args: {
    onSearch: SEARCH_COUNTRIES,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Standard.args,
    disabled: true,
  },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Standard.args,
    initialSuggestions: [COUNTRIES[1], COUNTRIES[3]],
  },
  parameters: {
    form: {
      initialValues: {
        items: [COUNTRIES[1].value, COUNTRIES[3].value],
      },
    },
  },
} satisfies Story;

export const PrefilledAndDisabled = {
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
