import { useDebounceCallback } from "@react-hook/debounce";
import { Ui5CustomEvent } from "@ui5/webcomponents-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLatestRef } from "../../../hook/useLatestRef";
import { DEBOUNCE_RATE } from "../../common/CommonSelection";
import { CoreAutocompleteProps } from "../internal/CoreAutocomplete";

export type UseAsyncManagedPropKeys = keyof Pick<
  CoreAutocompleteProps,
  "items" | "filterItem"
>;

type UseAsyncUsedPropKeys = keyof Pick<
  CoreAutocompleteProps,
  "onInputChange" | "onValueChange" | "getItemLabel"
>;

export type UseAsyncAdditionalProps<TItemModel extends {}> = {
  /**
   * Minimum number of characters before search is triggered.
   * Default: 1.
   */
  minCharsForSearch?: number;

  /**
   * The search method to use in order to generate items.
   * This method is fired on every key press.
   *
   * @param searchTerm the entered value
   * @returns Promise of the items to use for showing items
   */
  loadItems: (searchTerm: string) => Promise<Array<TItemModel>>;

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
  const { minCharsForSearch, loadItems, initialItems, ...restProps } = props;
  const {
    onInputChange: propsOnInputChange,
    getItemLabel: propsGetItemLabel,
    onValueChange: propsOnValueChange,
  } = restProps;

  const [loadedOptions, setLoadedOptions] = useState<Array<TItemModel>>(
    initialItems ?? []
  );

  const lastRequest = useRef<unknown>(undefined);
  const mounted = useRef<boolean>(false);
  const lastItemSelection = useRef<TItemModel | undefined>();
  const latestGetItemLabel = useLatestRef(propsGetItemLabel);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleInputValueChangeDebounced = useDebounceCallback(
    (inputValue: string) => {
      if (
        !inputValue ||
        (minCharsForSearch != null && inputValue.length < minCharsForSearch)
      ) {
        lastRequest.current = undefined;
        setLoadedOptions([]);
        return;
      }

      // there is one case where we shouldn't search, after a selection has been made.
      // First a search is not necessary, second it can be harmful: The label which is put
      // into the input field after selection, doesn't need to be a proper & matching search term
      // => only search if the search term doesn't match the label of the current value
      const hasBeenSelected =
        lastItemSelection.current != null &&
        inputValue === latestGetItemLabel.current(lastItemSelection.current);

      if (hasBeenSelected) {
        return;
      }

      const request = (lastRequest.current = {});

      loadItems(inputValue).then((options) => {
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
    DEBOUNCE_RATE
  );

  const onInputChange = useCallback(
    (inputValue: string, event: Ui5CustomEvent<HTMLInputElement>) => {
      if (propsOnInputChange != null) {
        propsOnInputChange(inputValue, event);
      }

      handleInputValueChangeDebounced(inputValue);
    },
    [propsOnInputChange, handleInputValueChangeDebounced]
  );

  const onValueChange = useCallback(
    (value?: string, item?: TItemModel) => {
      lastItemSelection.current = item;

      if (propsOnValueChange != null) {
        propsOnValueChange(value, item);
      }
    },
    [propsOnValueChange]
  );

  // @ts-ignore TODO what's wrong here?
  return {
    ...restProps,
    onInputChange,
    onValueChange,
    items: loadedOptions,
    filterItem: null,
  };
};
