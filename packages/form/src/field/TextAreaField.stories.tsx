import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { FormController } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import { TextAreaField } from "./TextAreaField";
import { FormFieldRef } from "./types";

interface FormData {
  text?: string;
}

const meta = {
  title: "Form/Field/TextAreaField",
  component: TextAreaField,
  argTypes: {},
  parameters: {
    form: {
      initialValues: {},
      onSubmit: action("onSubmit"),
    },
  },
  render(props, context) {
    const { initialValues, onSubmit, ...formControllerProps } =
      context.parameters.form;

    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit,
    });

    const fieldRef = useRef<FormFieldRef<FormData, "text">>(null);

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <TextAreaField {...props} ref={fieldRef} name="text" />
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof TextAreaField>;

export default meta;

type Story = StoryObj<typeof TextAreaField>;

const i18nStoryRenderer = (
  renderFn: typeof meta.render
): typeof meta.render => {
  return (args, context) => (
    <FormI18nProvider
      getValidationErrorMessage={({ name }, error) =>
        `Field '${name}' has Error '${error.type}'. Original error message: ${
          error.message || "---"
        }`
      }
    >
      {renderFn?.(args, context)}
    </FormI18nProvider>
  );
};

export const Empty = {
  args: {
    name: "text",
  },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Empty.args,
  },
  parameters: {
    form: {
      initialValues: {
        text: "hello world",
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Empty.args,
    disabled: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const Readonly = {
  args: {
    ...Empty.args,
    readonly: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    ...Empty.args,
    required: true,
  },
} satisfies Story;

export const ValidationMinLength = {
  args: {
    ...Empty.args,
    minLength: 4,
  },
} satisfies Story;

export const ValidationMinMaxLength = {
  args: {
    ...Empty.args,
    minLength: 4,
    maxLength: 10,
  },
} satisfies Story;

export const ValidationTranslationRequired = {
  render: i18nStoryRenderer(meta.render),
  args: {
    ...ValidationRequired.args,
  },
} satisfies Story;

export const ValidationTranslationMinLength = {
  render: i18nStoryRenderer(meta.render),
  args: {
    ...ValidationMinLength.args,
  },
} satisfies Story;

export const ValidationTranslationMinMaxLength = {
  render: i18nStoryRenderer(meta.render),
  args: {
    ...ValidationMinMaxLength.args,
  },
} satisfies Story;
