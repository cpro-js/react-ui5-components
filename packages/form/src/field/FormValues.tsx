import { DeepPartial, UnpackNestedValue, useWatch } from "react-hook-form";

export type FormValuesProps<T extends {}> = {
  render: (values: UnpackNestedValue<DeepPartial<T>>) => JSX.Element | null;
};

export function FormValues<T extends {}>(props: FormValuesProps<T>) {
  const x = useWatch<T>({});
  return props.render(x);
}
