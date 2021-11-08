import { FormChangeHandler } from "../field/types";
import { useFormListener } from "./useFormListener";

export type FormListenerProps<FormValues extends {}> = {
  onChange: FormChangeHandler<FormValues>;
};

export function FormListener<FormValues extends {}>(
  props: FormListenerProps<FormValues>
) {
  const { onChange } = props;

  useFormListener(onChange);

  return null;
}
