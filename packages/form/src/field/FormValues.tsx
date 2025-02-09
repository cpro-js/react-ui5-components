import { ReactNode } from "react";
import { useWatch } from "react-hook-form";

import { PartialFormValues } from "./types";

export type FormValuesProps<FormValues extends {}> = {
  render: (values: PartialFormValues<FormValues>) => ReactNode | null;
};

export function FormValues<T extends {}>(props: FormValuesProps<T>) {
  const x = useWatch<T>({});
  return props.render(x as unknown as PartialFormValues<T>);
}
