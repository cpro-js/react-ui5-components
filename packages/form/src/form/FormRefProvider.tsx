import {
  ReactElement,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { useFormContext } from "react-hook-form";

import { FormActions, FormRef } from "../field/types";
import { useLatestRef } from "../hook/useLatestRef";
import { useFormActions } from "./useFormActions";

export interface FormRefProviderProps {}

export const FormRefProvider = forwardRef<
  FormRef<unknown>,
  FormRefProviderProps
>((props, forwardedRef) => {
  const {
    getValues,
    formState: { isValid, isValidating, errors, isSubmitted },
    trigger,
  } = useFormContext();
  const actions = useFormActions();
  const actionsRef = useLatestRef<FormActions<unknown>>(actions);
  const getValuesRef = useLatestRef(getValues);
  const validRef = useLatestRef(isValid || Object.keys(errors).length === 0);
  const validatingRef = useLatestRef(isValidating);
  const validateRef = useLatestRef(trigger);

  console.log(errors);
  console.log("isValid", isValid);
  console.log("isValidating", isValidating);
  console.log("isSubmitted", isSubmitted);

  useEffect(() => {
    validateRef.current();
  }, []);

  useImperativeHandle(
    forwardedRef,
    () => ({
      get isValid() {
        return validRef.current;
      },
      get values() {
        return getValuesRef.current();
      },
      get actions() {
        return actionsRef.current;
      },
      validate() {
        return validateRef.current();
      },
    }),
    []
  );

  return null;
}) as <FormValues>(
  p: FormRefProviderProps & {
    ref?: Ref<FormRef<FormValues> | undefined>;
  }
) => ReactElement;
