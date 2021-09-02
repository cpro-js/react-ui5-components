import { useEffect } from "react";
import {
  DeepPartial,
  UnpackNestedValue,
  useFormContext,
} from "react-hook-form";

export type FormListenerProps<T extends {}> = {
  onChange: (values: UnpackNestedValue<DeepPartial<T>>) => void;
};

export function FormListener<T extends {}>(props: FormListenerProps<T>) {
  const { onChange } = props;
  const { watch } = useFormContext<T>();

  useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as UnpackNestedValue<DeepPartial<T>>);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, onChange]);

  return null;
}
