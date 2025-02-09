import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import {
  ChangedField,
  FormChangeHandler,
  PartialFormValues,
} from "../field/types";
import { useLatestRef } from "../hook/useLatestRef";
import { useFormActions } from "./useFormActions";

/**
 * Form listener hook that will trigger the callback on every value change
 *
 * @param onChange
 */
export function useFormListener<FormValues extends {}>(
  onChange: FormChangeHandler<FormValues>
): void {
  const { watch } = useFormContext<FormValues>();

  // Remember the latest callback.
  const changeCallbackRef =
    useLatestRef<FormChangeHandler<FormValues>>(onChange);

  // Get actions
  const actions = useFormActions<FormValues>();
  const actionsRef = useLatestRef(actions);

  // Set up the watcher
  useEffect(() => {
    const subscription = watch((values, { name }) => {
      changeCallbackRef.current(
        values as PartialFormValues<FormValues>,
        actionsRef.current,
        { name } as ChangedField<FormValues>
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
}
