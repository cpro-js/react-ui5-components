import { FilterBar } from "@ui5/webcomponents-react";
import { FilterBarPropTypes } from "@ui5/webcomponents-react/components/FilterBar";
import {
  FC,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useFormContext } from "react-hook-form";

import { triggerSubmit } from "../component/util";
import { FormActionContext } from "./context/FormActionContext";

export interface FormFilterBarProps extends FilterBarPropTypes {}

/**
 * Checkbox wrapper to transform the UI5 checkbox into a HTML compliant checkbox
 */
export const FormFilterBar: FC<FormFilterBarProps> = (props) => {
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
  const { clear, reset } = useContext(FormActionContext);

  const valuesBeforeRef = useRef<any>();
  const valuesChangedRef = useRef<any>();
  const openRef = useRef<boolean>(false);

  useEffect(() => {
    const sub = watch((values) => {
      if (openRef.current) {
        console.log("value change", values);
        valuesChangedRef.current = values;
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [watch, getValues]);

  const resetChanges = useCallback(() => {
    if (valuesBeforeRef.current != null) {
      Object.entries(valuesBeforeRef.current).forEach(([key, value]) => {
        console.log("set value", key, value);
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
      console.log(valuesChangedRef.current);
      Object.entries(valuesChangedRef.current).forEach(([key, value]) => {
        console.log("set value", key, value);
        setValue(key, value);
      });
    }
  }, [getValues, setValue]);

  const handleFiltersDialogOpen: typeof onFiltersDialogOpen = useCallback(
    (event) => {
      console.log("handleFiltersDialogOpen");
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
      console.log("onFiltersDialogClose");
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
      console.log("handleFiltersDialogClear");
      clearValues();

      if (onFiltersDialogClear != null) {
        onFiltersDialogClear(event);
      }
    },
    [onFiltersDialogClear, clearValues]
  );

  const handleFiltersDialogCancel: typeof onFiltersDialogCancel = useCallback(
    (event) => {
      console.log("handleFiltersDialogCancel");
      resetChanges();

      if (onFiltersDialogCancel != null) {
        onFiltersDialogCancel(event);
      }
    },
    [onFiltersDialogCancel, resetChanges]
  );

  const handleFiltersDialogSave: typeof onFiltersDialogSave = useCallback(
    (event) => {
      console.log("handleFiltersDialogSave");
      saveValues();

      if (onFiltersDialogSave != null) {
        onFiltersDialogSave(event);
      }
    },
    [onFiltersDialogSave, saveValues]
  );

  const handleGo: typeof onGo = useCallback(
    (event) => {
      console.log("handleGo");
      if (openRef.current) {
        // filter bar is opened and submitted via Go Button -> we need to save new values before
        saveValues();
      }

      triggerSubmit(event);

      if (onGo != null) {
        onGo(event);
      }
    },
    [onGo]
  );

  const handleRestore: typeof onRestore = useCallback(
    (event) => {
      console.log("handleRestore");
      restoreValues();

      if (onRestore != null) {
        onRestore(event);
      }
    },
    [onRestore, restoreValues]
  );

  const handleClear: typeof onClear = useCallback(
    (event) => {
      console.log("handleClear");
      clearValues();

      if (onClear != null) {
        onClear(event);
      }
    },
    [onClear, clearValues]
  );

  return (
    <FilterBar
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
};
