import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { MultiSelectItem } from "../component/MultiSelect";
import { FormController } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import { MultiSelectField, MultiSelectFieldProps } from "./MultiSelectField";
import { FormFieldRef } from "./types";

export interface MultiSelectItemAlt extends MultiSelectItem {
  alt: string;
}

const items: Array<MultiSelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
];

interface FormData {
  item?: Array<string | number>;
}

const meta = {
  title: "Form/Field/MultiSelectField",
  component: MultiSelectField,
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

    const fieldRef = useRef<FormFieldRef<FormData, "item">>(null);

    const isCustomItemModel =
      typeof props.itemLabel === "function" ||
      typeof props.itemValue === "function";

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {isCustomItemModel ? (
          <MultiSelectField<FormData, "item", MultiSelectItemAlt, string>
            {...(props as MultiSelectFieldProps<
              FormData,
              "item",
              MultiSelectItemAlt,
              string
            >)}
            ref={fieldRef}
            name="item"
          />
        ) : (
          <MultiSelectField<FormData, "item">
            {...(props as MultiSelectFieldProps<FormData, "item">)}
            ref={fieldRef}
            name="item"
          />
        )}
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof MultiSelectField>;

export default meta;

type Story = StoryObj<typeof MultiSelectField>;

// --- Stories ---

export const Empty = {
  args: {},
} satisfies Story;

export const Standard = {
  args: {
    items,
  },
} satisfies Story;

export const Prefilled = {
  args: {
    ...Standard.args,
  },
  parameters: {
    form: {
      initialValues: {
        item: [items[1].value],
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

export const CustomItemModel = {
  args: {
    ...Standard.args,
    itemLabel: (item) => (item as MultiSelectItemAlt).alt,
    itemValue: (item) => (item as MultiSelectItemAlt).label,
  },
} satisfies Story;
