import { FilterBar, FilterBarPropTypes } from "@ui5/webcomponents-react";
import { FC, forwardRef, useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { useFormActions } from "./_internal/useFormActions";
import { useFormListener } from "./_internal/useFormListener";

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
    onFiltersDialogCancel,
    onFiltersDialogSave,
    onGo,
    onRestore,
    onClear,
    ...others
  } = props;

  const { getValues, setValue } = useFormContext();
  const { clear, reset, submit } = useFormActions();

  const valuesBeforeRef = useRef<any>(null);
  const valuesChangedRef = useRef<any>(null);
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

  const handleFiltersDialogOpen = useCallback<
    NonNullable<typeof onFiltersDialogOpen>
  >(
    (...args) => {
      valuesChangedRef.current = null;
      valuesBeforeRef.current = getValues();
      openRef.current = true;

      if (onFiltersDialogOpen != null) {
        onFiltersDialogOpen(...args);
      }
    },
    [onFiltersDialogOpen]
  );

  const handleFiltersDialogClose = useCallback<
    NonNullable<typeof onFiltersDialogClose>
  >(
    (...args) => {
      openRef.current = false;
      valuesBeforeRef.current = null;

      if (onFiltersDialogClose != null) {
        onFiltersDialogClose(...args);
      }
    },
    [onFiltersDialogClose]
  );

  const handleFiltersDialogCancel = useCallback<
    NonNullable<typeof onFiltersDialogCancel>
  >(
    (...args) => {
      resetChanges();

      if (onFiltersDialogCancel != null) {
        onFiltersDialogCancel(...args);
      }
    },
    [onFiltersDialogCancel, resetChanges]
  );

  const handleFiltersDialogSave = useCallback<
    NonNullable<typeof onFiltersDialogSave>
  >(
    (...args) => {
      saveValues();

      if (onFiltersDialogSave != null) {
        onFiltersDialogSave(...args);
      }
    },
    [onFiltersDialogSave, saveValues]
  );

  const handleGo = useCallback<NonNullable<typeof onGo>>(
    (...args) => {
      if (openRef.current) {
        // filter bar is opened and submitted via Go Button -> we need to save new values before
        saveValues();
      }

      submit();

      if (onGo != null) {
        onGo(...args);
      }
    },
    [onGo]
  );

  const handleRestore = useCallback<NonNullable<typeof onRestore>>(
    (...args) => {
      restoreValues();

      if (onRestore != null) {
        onRestore(...args);
      }
    },
    [onRestore, restoreValues]
  );

  const handleClear = useCallback<NonNullable<typeof onClear>>(
    (...args) => {
      clearValues();

      if (onClear != null) {
        onClear(...args);
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
