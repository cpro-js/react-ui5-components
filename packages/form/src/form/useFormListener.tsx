import { useEffect, useRef } from "react";
import {
  DeepPartial,
  UnpackNestedValue,
  useFormContext,
} from "react-hook-form";

export type UseFormListenerCallback<FormValues extends {}> = (
  values: UnpackNestedValue<DeepPartial<FormValues>>
) => void;

/**
 * Form listener hook that will trigger the callback on every value change
 *
 * @param onChange
 */
export function useFormListener<FormValues extends {}>(
  onChange: UseFormListenerCallback<FormValues>
): void {
  const { watch } = useFormContext<FormValues>();

  // Remember the latest callback.
  const changeCallbackRef =
    useRef<UseFormListenerCallback<FormValues>>(onChange);
  useEffect(() => {
    changeCallbackRef.current = onChange;
  }, [onChange]);

  // Set up the watcher
  useEffect(() => {
    const subscription = watch((values) => {
      changeCallbackRef.current(
        values as UnpackNestedValue<DeepPartial<FormValues>>
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
}
