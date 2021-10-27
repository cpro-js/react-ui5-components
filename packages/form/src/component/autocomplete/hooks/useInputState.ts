import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { FocusEvent, useCallback, useEffect, useState } from "react";

import { useLatestRef } from "../../../hook/useLatestRef";
import { CoreAutocompleteProps } from "../internal/CoreAutocomplete";

export const useInputState = <
  TModel,
  TAdditionalProps extends CoreAutocompleteProps<TModel>
>(
  props: TAdditionalProps
): TAdditionalProps => {
  const {
    inputValue: propsInputValue,
    value: propsValue,
    onInputChange: propsOnInputChange,
    onValueChange: propsOnValueChange,
    onBlur: propsOnBlur,
  } = props;

  const [stateInputValue, setStateInputValue] = useState<string | undefined>(
    propsInputValue !== undefined ? propsInputValue : "" // todo defaultInputValue?
  );
  const [stateValue, setStateValue] = useState<string | undefined>(
    propsValue !== undefined ? propsValue : undefined // todo defaultValue?
  );

  const latestValueRef = useLatestRef(stateValue);

  useEffect(() => {
    setStateInputValue(propsInputValue ?? "");
  }, [propsInputValue, setStateInputValue]);

  useEffect(() => {
    setStateInputValue(propsInputValue ?? "");
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
    (value?: string, item?: TModel) => {
      if (propsOnValueChange != null) {
        propsOnValueChange(value, item);
      }

      setStateValue(value);
    },
    [setStateValue, propsOnValueChange]
  );

  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (propsOnBlur != null) {
        propsOnBlur(event);
      }

      if (latestValueRef.current == null && event.currentTarget.value != "") {
        // reset display value when user leaves the field and there is no selected value
        setStateInputValue("");
      }
    },
    [setStateValue, propsOnBlur]
  );

  return {
    ...props,
    inputValue: stateInputValue,
    value: stateValue,
    onInputChange,
    onValueChange,
    onBlur,
  };
};
