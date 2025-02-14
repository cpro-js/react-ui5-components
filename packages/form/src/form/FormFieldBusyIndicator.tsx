import {
  BusyIndicator,
  BusyIndicatorPropTypes,
} from "@ui5/webcomponents-react";
import { ReactNode } from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

export interface FormFieldBusyIndicatorProps<FormValues extends FieldValues>
  extends BusyIndicatorPropTypes {
  name: FieldPath<FormValues>;
}

export const FormFieldBusyIndicator = <FormValues extends FieldValues>(
  props: FormFieldBusyIndicatorProps<FormValues>
): ReactNode => {
  const { name, children, ...busyIndicatorProps } = props;
  const {
    getFieldState,
    formState: { isSubmitting, isValidating: isFormValidating },
  } = useFormContext();

  // NOTE: isFormValidating triggers rendering and getFieldState(name).isValidating return real state
  const isFieldValidating =
    getFieldState(name).isValidating && isFormValidating;

  // TODO maybe show also busy for isSubmitting
  return (
    <BusyIndicator
      active={props.active || isSubmitting || isFieldValidating}
      delay={0}
      {...busyIndicatorProps}
    >
      {children}
    </BusyIndicator>
  );
};
