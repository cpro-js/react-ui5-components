import { useEffect } from "react";
import { WatchObserver, useFormContext } from "react-hook-form";
import { useEventCallback } from "usehooks-ts";

import {
  ChangedField,
  FormChangeHandler,
  PartialFormValues,
} from "../field/types";
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
  const actions = useFormActions<FormValues>();

  const formWatcher: WatchObserver<FormValues> = useEventCallback(
    (values, { name }) => {
      // TODO watcher triggers multiple times, even if there is no difference
      onChange(values as PartialFormValues<FormValues>, actions, {
        name,
      } as ChangedField<FormValues>);
    }
  );

  // Set up the watcher
  useEffect(() => {
    const { unsubscribe } = watch(formWatcher);
    return () => {
      unsubscribe();
    };
  }, [formWatcher, watch]);
}
