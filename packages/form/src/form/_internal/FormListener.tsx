import { FormChangeHandler } from "../../field/types";
import { useFormListener } from "./useFormListener";

export type FormListenerProps<FormValues extends {}> = {
  /** custom event handler that triggers when any value of the form is changed  */
  onChange: FormChangeHandler<FormValues>;
};

export function FormListener<FormValues extends {}>(
  props: FormListenerProps<FormValues>
) {
  const { onChange } = props;

  useFormListener(onChange);

  return null;
}
