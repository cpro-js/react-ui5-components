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

export const useCreatable = <
  TItemModel,
  TAdditionalProps extends UseAsyncProps<TItemModel> &
    UsedAutocompleteProps<TItemModel>
>(
  props: TAdditionalProps
): Omit<TAdditionalProps, keyof UseAsyncProps<TItemModel>> => {
  const {} = props;

  return {
    ...props,
  };
};
