import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within } from "@storybook/test";

import { FormController } from "../form/FormController";
import { CurrencyInputField } from "./CurrencyInputField";
import { FormViewer, useFormViewer } from "./FormViewer";

interface FormData {
  theNumber?: number;
}

const meta = {
  title: "Form/Field/CurrencyInputField/Interactions",
  component: CurrencyInputField,
  parameters: {
    form: {
      initialValues: {},
      onSubmit: action("form-submit"),
    },
  },
  args: {
    currency: "EUR",
    onFocus: fn(),
    onInput: fn(),
    onBlur: fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof CurrencyInputField>;

export default meta;

type Story = StoryObj<typeof CurrencyInputField>;

const mockSubmit = fn();

const createPrefilledCurrencyTest = (initial: number): Story => ({
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });
    return (
      <FormController
        initialValues={{ theNumber: initial }}
        onSubmit={handleSubmit}
      >
        <CurrencyInputField {...props} name="theNumber" />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        { theNumber: initial },
        expect.anything()
      );
    });
  },
});

export const PrefilledTest = createPrefilledCurrencyTest(10.29);

export const PrefilledAndRoundedTest = createPrefilledCurrencyTest(10.299);

export const RequiredTest = {
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <CurrencyInputField
          data-testid="currency-input"
          {...props}
          name={"theNumber"}
          required
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = canvas.getByText("Submit");

    await userEvent.click(submitBtn);

    await waitFor(() => {
      const currencyInput = canvas.getByTestId("currency-input");
      expect(currencyInput.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const ValidationMinTest = {
  args: {
    min: 4,
  },
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <CurrencyInputField
          data-testid="min-input"
          {...props}
          name="theNumber"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("min-input") as HTMLElement;
    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;

    await userEvent.type(input, "1");

    //forced onChange event. To-Do: Trigger it without forcing it
    input.dispatchEvent(new Event("change", { bubbles: true }));

    await waitFor(() => {
      expect(host.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  },
} satisfies Story;

export const ValidationMinMaxTest = {
  args: {
    min: 4,
    max: 10,
  },
  render: (props, context) => {
    const { submittedValues, handleSubmit } = useFormViewer<FormData>({
      onSubmit: mockSubmit,
    });

    return (
      <FormController onSubmit={handleSubmit}>
        <CurrencyInputField
          data-testid="min-input"
          {...props}
          name="theNumber"
        />
        <FormViewer submittedValues={submittedValues} />
      </FormController>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId("min-input") as HTMLElement;
    const input = host.shadowRoot?.querySelector("input") as HTMLInputElement;

    await userEvent.type(input, "1");

    //forced onChange event. To-Do: Trigger it without forcing it
    input.dispatchEvent(new Event("change", { bubbles: true }));

    await waitFor(() => {
      expect(host.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    await userEvent.keyboard("{Control>}a{/Control}{Backspace}"); //clearing input
    await userEvent.type(input, "11");
    input.dispatchEvent(new Event("change", { bubbles: true }));

    await waitFor(() => {
      expect(host.getAttribute("value-state")).toBe("Negative");
      expect(mockSubmit).not.toHaveBeenCalled();
    });

    await userEvent.keyboard("{Control>}a{/Control}{Backspace}"); //clearing input
    await userEvent.type(input, "8");
    input.dispatchEvent(new Event("change", { bubbles: true }));

    await waitFor(() => {
      expect(host.getAttribute("value-state")).toBe("None");
    });
  },
} satisfies Story;
