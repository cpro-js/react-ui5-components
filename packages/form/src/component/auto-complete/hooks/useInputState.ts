import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { useCallback, useEffect, useState } from "react";

import { CoreAutocompleteProps } from "../internal/CoreAutocomplete";

export const useInputState = <
  TModel,
  TAdditionalProps extends CoreAutocompleteProps<TModel>
>(
  props: TAdditionalProps
): TAdditionalProps => {
  const {
    inputValue: propsInputValue,
    getItemValue,
    value: propsValue,
    onInputChange: propsOnInputChange,
    onValueChange: propsOnValueChange,
  } = props;

  const [stateInputValue, setStateInputValue] = useState(
    propsInputValue !== undefined ? propsInputValue : "" // todo defaultInputValue?
  );
  const [stateValue, setStateValue] = useState(
    propsValue !== undefined ? propsValue : undefined // todo defaultValue?
  );

  useEffect(() => {
    setStateInputValue(propsInputValue ?? "");
  }, [propsInputValue, setStateInputValue]);

  useEffect(() => {
    setStateValue(propsValue);
  }, [propsValue, setStateValue]);

  const onInputChange = useCallback(
    (inputValue: string, event: Ui5CustomEvent<HTMLInputElement>) => {
      if (propsOnInputChange != null) {
        propsOnInputChange(inputValue, event);
      }

      setStateInputValue(inputValue);
    },
    [setStateInputValue, propsOnInputChange]
  );

  const onValueChange = useCallback(
    (value?: TModel) => {
      if (propsOnValueChange != null) {
        propsOnValueChange(value);
      }

      setStateValue(value != null ? getItemValue(value) : undefined);
    },
    [setStateValue, propsOnValueChange]
  );

  return {
    ...props,
    inputValue: stateInputValue,
    value: stateValue,
    onInputChange,
    onValueChange,
  };
};