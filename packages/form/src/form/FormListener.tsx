import { DeepPartial, UnpackNestedValue } from "react-hook-form";

import { useFormListener } from "./useFormListener";

export type FormListenerProps<T extends {}> = {
  onChange: (values: UnpackNestedValue<DeepPartial<T>>) => void;
};

export function FormListener<T extends {}>(props: FormListenerProps<T>) {
  const { onChange } = props;

  useFormListener(onChange);

  return null;
}
