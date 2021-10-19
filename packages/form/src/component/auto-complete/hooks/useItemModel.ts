import { useCallback } from "react";

import { DefaultAutoCompleteOption } from "../../AutoCompleteModel";
import {
  DEFAULT_LABEL_PROP,
  DEFAULT_VALUE_PROP,
} from "../../common/CommonSelection";
import { CoreAutocompleteProps } from "../internal/CoreAutocomplete";

export interface UseItemModelProps<TItemModel> {
  /**
   * Controls which text is used to display options.
   * Used by suggestions, if not overridden
   * by <code>renderSuggestion</code>
   *
   * By default the prop <code>label</code> is used.
   * You can pass either a string, which represents a different prop or a render function.
   */
  itemLabel?: string | ((value: TItemModel) => string);

  /**
   * Controls which value / key is used to identify an option.
   * This is used by suggestions, if not overridden
   * by <code>renderSuggestion</code>.
   *
   * By default the prop <code>value</code> is used.
   * You can pass either a string, which represents a different prop or a render function.
   */
  itemValue?: string | ((value: TItemModel) => string);
}

export type UseItemModelReturn<
  TItemModel,
  TAdditionalProps extends UseItemModelProps<TItemModel>
> = Omit<TAdditionalProps, keyof UseItemModelProps<TItemModel>> &
  Required<
    Pick<CoreAutocompleteProps<TItemModel>, "getItemValue" | "getItemLabel">
  >;

export const useItemModel = <
  TItemModel,
  TAdditionalProps extends UseItemModelProps<TItemModel>
>(
  props: TAdditionalProps
): UseItemModelReturn<TItemModel, TAdditionalProps> => {
  const { itemValue, itemLabel, ...otherProps } = props;

  const getItemLabel = useCallback(
    (item: TItemModel): string => {
      if (itemLabel) {
        if (typeof itemLabel === "string") {
          return item[itemLabel as keyof TItemModel] as unknown as string;
        } else if (typeof itemLabel === "function") {
          return itemLabel(item);
        }
      }
      return (item as unknown as DefaultAutoCompleteOption)[
        DEFAULT_LABEL_PROP
      ] as unknown as string;
    },
    [itemLabel]
  );

  const getItemValue = useCallback(
    (item: TItemModel): string => {
      if (itemValue) {
        if (typeof itemValue === "string") {
          return item[itemValue as keyof TItemModel] as unknown as string;
        } else if (typeof itemValue === "function") {
          return itemValue(item);
        }
      }
      return (item as unknown as DefaultAutoCompleteOption)[
        DEFAULT_VALUE_PROP
      ] as unknown as string;
    },
    [itemLabel]
  );

  return {
    ...otherProps,
    getItemLabel,
    getItemValue,
  };
};
