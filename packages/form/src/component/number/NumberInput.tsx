import { InputDomRef } from "@ui5/webcomponents-react";
import { FC, forwardRef, useContext } from "react";

import { BaseNumberInput } from "./BaseNumberInput";
import { NumberContext } from "./context/NumberContext";
import type {
  CommonNumberInputProps,
  NumberDisplayConfig,
  NumberInputConfig,
} from "./NumberModel";

export interface NumberInputProps
  extends CommonNumberInputProps,
    NumberDisplayConfig,
    NumberInputConfig {}

export const NumberInput: FC<NumberInputProps> = forwardRef<
  InputDomRef,
  NumberInputProps
>((props, forwardedRef) => {
  // extract currency specific fields from context
  const { currency, showCurrency, ...contextProps } = useContext(NumberContext);

  return <BaseNumberInput {...contextProps} {...props} ref={forwardedRef} />;
});
