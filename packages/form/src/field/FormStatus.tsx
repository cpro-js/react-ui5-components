import { ReactNode } from "react";
import { FormState, useFormState } from "react-hook-form";

export type FormStatusValues = Pick<
  FormState<any>,
  "isSubmitting" | "isDirty" | "dirtyFields" | "isValid" | "isValidating"
>;

export type FormStatusProps = {
  render: (values: FormStatusValues) => ReactNode | null;
};

export const FormStatus = (props: FormStatusProps) => {
  const formState = useFormState<any>({});
  return props.render(formState);
};
