import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { useCallback, useMemo } from "react";

import { useLatestRef } from "../../../hook/useLatestRef";
import { DefaultAutoCompleteOption } from "../../AutoCompleteModel";
import { CoreAutocompleteProps } from "../internal/CoreAutocomplete";

export const isValidNewItem = <T = DefaultAutoCompleteOption>(
  inputValue: string | undefined,
  items: Array<T>,
  getItemLabel: (item: T) => string
) => {
  return !(
    !inputValue ||
    items.some(
      (item) =>
        String(getItemLabel(item)).toLowerCase() ===
        String(inputValue).toLowerCase()
    )
  );
};

const defaultGetNewItem = <T = DefaultAutoCompleteOption>(
  inputValue: string,
  labelValue: string
): T => {
  const item: DefaultAutoCompleteOption = {
    label: labelValue,
    value: inputValue,
    // @ts-ignore TODO maybe we need this
    __isNew__: true,
  };

  return item as unknown as T;
};

// todo
export const defaultFormatCreateLabel = (inputValue: string) =>
  `Create "${inputValue}"`;

type UsedAutocompleteProps<TItemModel> = Pick<
  CoreAutocompleteProps<TItemModel>,
  | "inputValue"
  | "items"
  | "getItemLabel"
  | "getItemValue"
  | "onValueChange"
  | "onInputChange"
>;

export interface UseCreatableProps<TItemModel> {
  /**
   * Gets the label for the "create new ..." option in the menu. Is given the current input value.
   * @param inputValue current input value
   */
  formatCreateLabel?: (inputValue: string) => string;
  /**
   * Returns the data for the new option when it is created.
   *
   * @param inputValue
   * @param labelValue
   */
  getNewItem?: (inputValue: string, labelValue: string) => TItemModel;

  /**
   * If provided, this will be called with the input value when a new option is created, and onChange will not be called. Use this when you need more control over what happens when new options are created.
   *
   * @param item item to create
   */
  onValueCreate?: (item: TItemModel) => void;
}

export const useCreatable = <
  TItemModel,
  TAdditionalProps extends UseCreatableProps<TItemModel> &
    UsedAutocompleteProps<TItemModel>
>(
  props: TAdditionalProps
): Omit<TAdditionalProps, keyof UseCreatableProps<TItemModel>> => {
  const {
    formatCreateLabel = defaultFormatCreateLabel,
    getNewItem = defaultGetNewItem,
    onValueCreate,
    ...passThroughProps
  } = props;

  const {
    items: originalItems,
    inputValue: inputValue,
    getItemLabel,
    getItemValue,
    onValueChange,
    onInputChange,
  } = props;

  const newItem: TItemModel | undefined = useMemo(
    () =>
      isValidNewItem(inputValue, originalItems, getItemLabel)
        ? getNewItem(inputValue ?? "", formatCreateLabel(inputValue ?? ""))
        : undefined,
    [
      formatCreateLabel,
      getNewItem,
      getItemLabel,
      inputValue,
      isValidNewItem,
      originalItems,
    ]
  );
  const newItemRef = useLatestRef<TItemModel | undefined>(newItem);

  // todo new item position - start or first
  // todo disable new option while loading
  const items: Array<TItemModel> = useMemo(
    () => (newItem != null ? [...originalItems, newItem] : originalItems),
    [originalItems, newItem]
  );

  const handleInput = useCallback(
    (inputValue: string, event: Ui5CustomEvent<HTMLInputElement>) => {
      let inputValueCorrected = inputValue;
      if (
        newItemRef.current != null &&
        getItemLabel(newItemRef.current) === inputValue
      ) {
        // new item was selected and placed into text field --> we need to replace create label with the original user value
        const element = event.currentTarget as HTMLInputElement;
        inputValueCorrected = getItemValue(newItemRef.current);
        element.value = inputValueCorrected;
      }

      if (onInputChange != null) {
        onInputChange(inputValueCorrected, event);
      }
    },
    [getItemLabel, getItemValue]
  );

  const handleValueChange = useCallback(
    (item?: TItemModel) => {
      if (item && item === newItem) {
        // created item was selected
        if (onValueCreate != null) {
          onValueCreate(item);
        } else if (onValueChange != null) {
          const value = getItemValue(item);
          onValueChange(getNewItem(value, value));
        }
        return;
      }

      // other items were selected
      if (onValueChange != null) {
        onValueChange(item);
      }
    },
    [newItem, getNewItem, getItemValue, onValueChange, onValueCreate]
  );

  return {
    ...passThroughProps,
    items: items,
    onValueChange: handleValueChange,
    onInputChange: handleInput,
  };
};
