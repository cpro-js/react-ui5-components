import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { SelectItem } from "../component/Select";
import { FormController, FormControllerProps } from "../form/FormController";
import { FormI18nProvider } from "../i18n/FormI18n";
import { FormViewer, useFormViewer } from "./FormViewer";
import { SelectField, SelectFieldProps } from "./SelectField";
import { FormFieldRef } from "./types";

export interface SelectItemAlt extends SelectItem {
  alt: string;
}

const items: Array<SelectItemAlt> = [
  { value: 1, label: "Test 1 Number", alt: "Test 1 Number Alt" },
  { value: "1", label: "Test 1 String", alt: "Test 1 String Alt" },
  { value: "2", label: "Test 2", alt: "Test 2 Alt" },
  { value: "3", label: "Test 3", alt: "Test 3 Alt" },
  { value: "4", label: "Test 4", alt: "Test 4 Alt" },
];

interface FormData {
  item?: string | number;
}

const meta = {
  title: "Form/Field/SelectField",
  component: SelectField,
  argTypes: {
    onSubmit: {
      action: "submit",
    },
  },
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

    const fieldRef = useRef<FormFieldRef<FormData, "item">>(null);

    const isCustomItemModel =
      typeof props.itemLabel === "string" ||
      typeof props.itemValue === "string";

    return (
      <FormController
        {...formControllerProps}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {isCustomItemModel ? (
          <SelectField<FormData, "item", SelectItemAlt, string>
            {...(props as SelectFieldProps<
              FormData,
              "item",
              SelectItemAlt,
              string
            >)}
            ref={fieldRef}
            name="item"
          />
        ) : (
          <SelectField<FormData, "item">
            {...(props as SelectFieldProps<FormData, "item">)}
            ref={fieldRef}
            name="item"
          />
        )}
        <FormViewer submittedValues={submittedValues} fieldRef={fieldRef} />
      </FormController>
    );
  },
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof SelectField>;

export const Empty = {
  args: {},
};

export const Standard = {
  args: {
    items,
  },
} satisfies Story;

export const WithEmptyOption = {
  args: {
    ...Standard.args,
    addEmptyOption: true,
  },
} satisfies Story;

export const Prefilled = {
  args: {
    ...WithEmptyOption.args,
  },
  parameters: {
    form: {
      initialValues: {
        item: items[1].value,
      },
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...WithEmptyOption.args,
    disabled: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const Readonly = {
  args: {
    ...WithEmptyOption.args,
    readonly: true,
  },
  parameters: {
    ...Prefilled.parameters,
  },
} satisfies Story;

export const ValidationRequired = {
  args: {
    ...WithEmptyOption.args,
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
    items,
    itemLabel: (item) => (item as SelectItemAlt).alt,
    itemValue: (item) => (item as SelectItemAlt).label,
  },
} satisfies Story;
