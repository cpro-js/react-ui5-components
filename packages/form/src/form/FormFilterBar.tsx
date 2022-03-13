import { FilterBar } from "@ui5/webcomponents-react";
import { FilterBarPropTypes } from "@ui5/webcomponents-react/components/FilterBar";
import { FC, forwardRef, useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { useFormActions } from "./useFormActions";
import { useFormListener } from "./useFormListener";

export interface FormFilterBarProps extends FilterBarPropTypes {}

/**
 * Checkbox wrapper to transform the UI5 checkbox into a HTML compliant checkbox
 */
export const FormFilterBar: FC<FormFilterBarProps> = forwardRef<
  HTMLDivElement,
  FormFilterBarProps
>((props, forwardedRef) => {
  const {
    children,

    onFiltersDialogOpen,
    onFiltersDialogClose,
    onFiltersDialogClear,
    onFiltersDialogCancel,
    onFiltersDialogSave,
    onGo,
    onRestore,
    onClear,
    ...others
  } = props;

  const { getValues, setValue, watch } = useFormContext();
  const { clear, reset, submit } = useFormActions();

  const valuesBeforeRef = useRef<any>();
  const valuesChangedRef = useRef<any>();
  const openRef = useRef<boolean>(false);

  useFormListener((values) => {
    if (openRef.current) {
      valuesChangedRef.current = values;
    }
  });

  const resetChanges = useCallback(() => {
    if (valuesBeforeRef.current != null) {
      Object.entries(valuesBeforeRef.current).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [getValues, setValue, reset]);

  const restoreValues = useCallback(() => {
    // reset values to initial values
    reset();
  }, [reset]);

  const clearValues = useCallback(() => {
    // remove all form values
    clear();
  }, [clear]);

  const saveValues = useCallback(() => {
    if (valuesChangedRef.current != null) {
      Object.entries(valuesChangedRef.current).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [getValues, setValue]);

  const handleFiltersDialogOpen: typeof onFiltersDialogOpen = useCallback(
    (event) => {
      valuesChangedRef.current = null;
      valuesBeforeRef.current = getValues();
      openRef.current = true;

      if (onFiltersDialogOpen != null) {
        onFiltersDialogOpen(event);
      }
    },
    [onFiltersDialogOpen]
  );

  const handleFiltersDialogClose: typeof onFiltersDialogClose = useCallback(
    (event) => {
      openRef.current = false;
      valuesBeforeRef.current = null;

      if (onFiltersDialogClose != null) {
        onFiltersDialogClose(event);
      }
    },
    [onFiltersDialogClose]
  );

  const handleFiltersDialogClear: typeof onFiltersDialogClear = useCallback(
    (event) => {
      clearValues();

      if (onFiltersDialogClear != null) {
        onFiltersDialogClear(event);
      }
    },
    [onFiltersDialogClear, clearValues]
  );

  const handleFiltersDialogCancel: typeof onFiltersDialogCancel = useCallback(
    (event) => {
      resetChanges();

      if (onFiltersDialogCancel != null) {
        onFiltersDialogCancel(event);
      }
    },
    [onFiltersDialogCancel, resetChanges]
  );

  const handleFiltersDialogSave: typeof onFiltersDialogSave = useCallback(
    (event) => {
      saveValues();

      if (onFiltersDialogSave != null) {
        onFiltersDialogSave(event);
      }
    },
    [onFiltersDialogSave, saveValues]
  );

  const handleGo: typeof onGo = useCallback(
    (event) => {
      if (openRef.current) {
        // filter bar is opened and submitted via Go Button -> we need to save new values before
        saveValues();
      }

      submit();

      if (onGo != null) {
        onGo(event);
      }
    },
    [onGo]
  );

  const handleRestore: typeof onRestore = useCallback(
    (event) => {
      restoreValues();

      if (onRestore != null) {
        onRestore(event);
      }
    },
    [onRestore, restoreValues]
  );

  const handleClear: typeof onClear = useCallback(
    (event) => {
      clearValues();

      if (onClear != null) {
        onClear(event);
      }
    },
    [onClear, clearValues]
  );

  return (
    <FilterBar
      ref={forwardedRef}
      {...others}
      onFiltersDialogOpen={handleFiltersDialogOpen}
      onFiltersDialogClose={handleFiltersDialogClose}
      onFiltersDialogClear={handleFiltersDialogClear}
      onFiltersDialogCancel={handleFiltersDialogCancel}
      onFiltersDialogSave={handleFiltersDialogSave}
      onGo={handleGo}
      onRestore={handleRestore}
      onClear={handleClear}
    >
      {children}
    </FilterBar>
  );
});
