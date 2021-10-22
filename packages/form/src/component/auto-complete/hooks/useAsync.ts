import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { useCallback, useEffect, useRef, useState } from "react";

import { CoreAutocompleteProps } from "../internal/CoreAutocomplete";

export type UseAsyncManagedPropKeys = keyof Pick<
  CoreAutocompleteProps,
  "items"
>;

type UseAsyncUsedPropKeys = keyof Pick<CoreAutocompleteProps, "onInputChange">;

export type UseAsyncAdditionalProps<TItemModel extends {}> = {
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
  initialItems?: Array<TItemModel>;
};

type UseAsyncAdditionalPropKeys = keyof UseAsyncAdditionalProps<{}>;

export type UseAsyncProps<
  TItemModel extends {},
  TAdditionalProps extends Pick<
    CoreAutocompleteProps<TItemModel>,
    UseAsyncUsedPropKeys
  >
> = Omit<TAdditionalProps, UseAsyncManagedPropKeys> &
  UseAsyncAdditionalProps<TItemModel>;

export type UseAsyncPropsReturn<
  TItemModel extends {},
  TAdditionalProps extends Pick<
    CoreAutocompleteProps<TItemModel>,
    UseAsyncUsedPropKeys
  >
> = Omit<TAdditionalProps, UseAsyncAdditionalPropKeys> &
  Required<Pick<CoreAutocompleteProps<TItemModel>, UseAsyncManagedPropKeys>>;

export const useAsync = <
  TItemModel,
  TAdditionalProps extends Pick<
    CoreAutocompleteProps<TItemModel>,
    UseAsyncUsedPropKeys
  >
>(
  props: UseAsyncProps<TItemModel, TAdditionalProps>
): UseAsyncPropsReturn<TItemModel, TAdditionalProps> => {
  const { minCharsForSearch, onSearch, initialItems, ...restProps } = props;
  const { onInputChange: propsOnInputChange } = restProps;

  const lastRequest = useRef<unknown>(undefined);
  const mounted = useRef<boolean>(false);

  const [loadedOptions, setLoadedOptions] = useState<Array<TItemModel>>(
    initialItems ?? []
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

  // @ts-ignore TODO what's wrong here?
  return {
    ...restProps,
    onInputChange,
    items: loadedOptions,
  };
};
