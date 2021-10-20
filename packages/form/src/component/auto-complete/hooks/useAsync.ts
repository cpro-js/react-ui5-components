import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { useCallback, useEffect, useRef, useState } from "react";

import { CoreAutocompleteProps } from "../internal/CoreAutocomplete";

type UsedAutocompleteProps<TItemModel> = Pick<
  CoreAutocompleteProps<TItemModel>,
  | "inputValue"
  | "items"
  | "getItemLabel"
  | "getItemValue"
  | "onValueChange"
  | "onInputChange"
>;

export interface UseAsyncProps<TItemModel> {
  /**
   * Minimum number of characters before search is triggered.
   * Default: 1.
   */
  minCharsForSearch?: number;

  /**
   * The search method to use in order to generate suggestions.
   * This method is fired on every key press.
   *
   * @param searchTerm the entered value
   * @returns Promise of the items to use for showing suggestions
   */
  onSearch: (searchTerm: string) => Promise<Array<TItemModel>>;

  /**
   * Initial items matching the initial value
   */
  defaultItems?: Array<TItemModel>;
}

export const useAsync = <
  TItemModel,
  TAdditionalProps extends UseAsyncProps<TItemModel> &
    UsedAutocompleteProps<TItemModel>
>(
  props: TAdditionalProps
): Omit<TAdditionalProps, keyof UseAsyncProps<TItemModel>> => {
  const { onSearch, defaultItems, ...restProps } = props;
  const {
    inputValue: propsInputValue,
    onInputChange: propsOnInputChange,
    minCharsForSearch,
  } = restProps;

  const lastRequest = useRef<unknown>(undefined);
  const mounted = useRef(false);

  const [loadedOptions, setLoadedOptions] = useState<Array<TItemModel>>(
    defaultItems ?? []
  );

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const onInputChange = useCallback(
    (inputValue: string, event: Ui5CustomEvent<HTMLInputElement>) => {
      if (propsOnInputChange != null) {
        propsOnInputChange(inputValue, event);
      }

      if (
        !inputValue ||
        (minCharsForSearch != null && inputValue.length < minCharsForSearch)
      ) {
        lastRequest.current = undefined;
        setLoadedOptions([]);
        return;
      }

      const request = (lastRequest.current = {});

      onSearch(inputValue).then((options) => {
        if (!mounted) {
          return;
        }
        if (request !== lastRequest.current) {
          return;
        }
        lastRequest.current = undefined;
        setLoadedOptions(options || []);
      });
    },
    [onSearch, propsOnInputChange]
  );

  return {
    ...restProps,
    onInputChange: onInputChange,
    items: loadedOptions,
  };
};
