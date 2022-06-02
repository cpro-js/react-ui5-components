import {
  BusyIndicator,
  FlexBox,
  FlexBoxDirection,
} from "@ui5/webcomponents-react";
import { FC, ReactNode } from "react";
import { useFormState } from "react-hook-form";

export interface FormBusyIndicatorProps {
  children?: ReactNode;
  /**
   * Overrides busy state regardless of the current form state
   */
  busy?: boolean;
}

export const FormBusyIndicator: FC<FormBusyIndicatorProps> = ({
  busy,
  children,
}) => {
  const { isSubmitting } = useFormState();
  const active = busy != null ? busy : isSubmitting;

  // Note: wrapped with flexbox in column mode to provide full width busy indicator
  return (
    <FlexBox direction={FlexBoxDirection.Column}>
      <BusyIndicator active={active}>
        <div style={{ width: "100%" }}>{children}</div>
      </BusyIndicator>
    </FlexBox>
  );
};
