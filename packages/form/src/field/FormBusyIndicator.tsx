import {
  BusyIndicator,
  BusyIndicatorPropTypes,
} from "@ui5/webcomponents-react";
import { ReactNode } from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

export enum FormBusyState {
  Loading = "Loading",
  Validating = "Validating",
  Submitting = "Submitting",
}

export interface FormBusyIndicatorProps<FormValues extends FieldValues>
  extends BusyIndicatorPropTypes {
  /**
   * Restricts busy indicator to specific field
   */
  name?: FieldPath<FormValues>;
  /**
   * Shows busy indicator when form is in specific state
   */
  activeWhen?: `${FormBusyState}` | Array<`${FormBusyState}`>;
}

export const FormBusyIndicator = <FormValues extends FieldValues>(
  props: FormBusyIndicatorProps<FormValues>
): ReactNode => {
  const {
    name,
    active,
    delay = 0,
    activeWhen = name
      ? [FormBusyState.Validating]
      : [FormBusyState.Loading, FormBusyState.Submitting],
    children,
    ...busyIndicatorProps
  } = props;

  const busyStates = Array.isArray(activeWhen) ? activeWhen : [activeWhen];

  const {
    getFieldState,
    formState: {
      isLoading: isFormLoading,
      isSubmitting: isFormSubmitting,
      isValidating: isFormValidating,
    },
  } = useFormContext();

  const isLoading = busyStates.includes(FormBusyState.Loading) && isFormLoading;
  // without name -> global form validation state; with name -> field validation state
  const isValidating =
    busyStates.includes(FormBusyState.Validating) &&
    isFormValidating &&
    !isFormSubmitting
      ? !name || getFieldState(name).isValidating
      : false;
  const isSubmitting =
    busyStates.includes(FormBusyState.Submitting) && isFormSubmitting;

  return (
    <BusyIndicator
      {...busyIndicatorProps}
      active={props.active ?? (isLoading || isValidating || isSubmitting)}
      delay={delay}
    >
      {children}
    </BusyIndicator>
  );
};
