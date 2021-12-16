import { InputDomRef } from "@ui5/webcomponents-react/webComponents/Input";
import { FC, forwardRef, useMemo } from "react";

import { BaseNumberInput, CommonNumberInputProps } from "./BaseNumberInput";

/**
 * Configuration options for the number display.
 * E.g. useGrouping=true will show thousand separator, when the input field is not focussed.
 */
export interface NumberDisplayConfig
  extends Pick<
    Intl.NumberFormatOptions,
    | "minimumIntegerDigits"
    | "minimumFractionDigits"
    | "maximumFractionDigits"
    | "minimumSignificantDigits"
    | "maximumSignificantDigits"
    | "useGrouping"
  > {}

/**
 * Configuration options for the number input.
 * E.g. maxFractionDigits=0 will allow no fractions as input
 */
export interface NumberInputConfig
  extends Pick<
    NumberDisplayConfig,
    "maximumFractionDigits" | "maximumSignificantDigits"
  > {}

export interface NumberInputProps extends CommonNumberInputProps {
  displayConfig?: NumberDisplayConfig;
  inputConfig?: NumberInputConfig;
}

export const NumberInput: FC<NumberInputProps> = forwardRef<
  InputDomRef,
  NumberInputProps
>((props, forwardedRef) => {
  const { displayConfig = {}, inputConfig = {}, ...passThrough } = props;

  const displayOptions: Intl.NumberFormatOptions = useMemo(
    () => ({ useGrouping: false, ...displayConfig }),
    [displayConfig]
  );

  return (
    <BaseNumberInput
      {...passThrough}
      ref={forwardedRef}
      inputConfig={inputConfig}
      displayConfig={displayOptions}
    />
  );
});
