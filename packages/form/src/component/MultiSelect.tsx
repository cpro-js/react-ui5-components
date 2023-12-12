import {
  MultiComboBox,
  MultiComboBoxDomRef,
  MultiComboBoxItem,
  MultiComboBoxPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { MultiComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/MultiComboBox";
import {
  ClipboardEvent,
  KeyboardEvent,
  MutableRefObject,
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { handlePastedText } from "./common/PasteHandler";
import { triggerSubmitOnEnter, useAllowAction } from "./util";

export interface MultiSelectItem {
  value: string | number;
  label: string;
}

export interface MultiSelectProps<
  Item = MultiSelectItem,
  Value = string | number
> extends Omit<
    MultiComboBoxPropTypes,
    | "name"
    | "value"
    | "filterValue"
    | "children"
    | "onSelectionChange"
    | "onChange"
  > {
  name?: string;
  /** Defines the value of the component.
   * The property is updated upon selecting.
   */
  value?: Array<Value>;
  /** Defines the items that can be selected in the component */
  items?: Array<Item>;
  /** Defines how to extract the value from each Item */
  itemValue?: keyof Item | ((value: Item) => string);
  /** Defines how to extract the label from each Item */
  itemLabel?: keyof Item | ((value: Item) => string);
  /** Event handler triggered when selecting an Item */
  onSelectionChange?: (
    event: Ui5CustomEvent<
      MultiComboBoxDomRef,
      MultiComboBoxSelectionChangeEventDetail
    >,
    value: Array<Value>
  ) => void;
}

const DEFAULT_LABEL_PROP = "label";
const DEFAULT_VALUE_PROP = "value";

/** `MultiSelect` as a wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-multicombobox--docs" target="_blank">UI5 MultiComboBox</a> adding
 * additional functionality and customization for handling multiple selections.
 */
export const MultiSelect = forwardRef<MultiComboBoxDomRef, MultiSelectProps>(
  (props, forwardedRef) => {
    const {
      name,
      items = [],
      onSelectionChange,
      onOpenChange,
      onKeyDown,
      onKeyPress,
      value,
      itemValue,
      itemLabel,
      ...otherProps
    } = props;

    const internalRef =
      useRef<MultiComboBoxDomRef>() as MutableRefObject<MultiComboBoxDomRef>;
    useImperativeHandle(forwardedRef, () => internalRef.current);

    const [selectedValue, setSelectedValue] = useState<typeof value>(value);
    useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    const retrieveItemLabel = useCallback(
      (item: MultiSelectItem) => {
        if (itemLabel) {
          if (typeof itemLabel === "string") {
            return item[itemLabel];
          } else if (typeof itemLabel === "function") {
            return itemLabel(item);
          }
        }
        return item[DEFAULT_LABEL_PROP];
      },
      [itemLabel]
    );

    const retrieveItemValue = useCallback(
      (item: MultiSelectItem) => {
        if (itemValue) {
          if (typeof itemValue === "string") {
            return item[itemValue];
          } else if (typeof itemValue === "function") {
            return itemValue(item);
          }
        }
        return item[DEFAULT_VALUE_PROP];
      },
      [itemValue]
    );

    const handleSelectionChange = useCallback(
      (
        event: Ui5CustomEvent<
          MultiComboBoxDomRef,
          MultiComboBoxSelectionChangeEventDetail
        >
      ) => {
        if (onSelectionChange != null) {
          const values: Array<string | number> = event.detail.items
            .map((el) => el.dataset.index)
            .filter((index) => index != null)
            .map((index) => retrieveItemValue(items[Number(index)]));

          onSelectionChange(event, values);
          setSelectedValue(values);
        }
      },
      [items, onSelectionChange, retrieveItemValue]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        // Fix: As long as the user is typing within the input ensure that no one else can catch these events
        // Background: Storybook is catching these events and triggering their shortcuts
        event.stopPropagation();
        if (onKeyDown != null) {
          onKeyDown(event);
        }
      },
      [onKeyDown]
    );

    const [allowSubmitOnEnter, setAllowSubmitOnEnter] = useAllowAction(true);
    const handleOpenChange = useCallback(
      (event: Ui5CustomEvent<MultiComboBoxDomRef & { open: boolean }>) => {
        setAllowSubmitOnEnter(!event.target.open);

        if (onOpenChange != null) {
          onOpenChange(event);
        }
      },
      [setAllowSubmitOnEnter, onOpenChange]
    );

    const handleKeyPress = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        // Workaround: Webcomponents catches enter -> need to submit manually
        // see https://github.com/SAP/ui5-webcomponents/pull/2855/files
        if (allowSubmitOnEnter.current) {
          // only if it's allowed
          triggerSubmitOnEnter(event);
        }
        if (onKeyPress != null) {
          onKeyPress(event);
        }
      },
      [onKeyPress]
    );

    const onPaste = useCallback(
      (event: ClipboardEvent<MultiComboBoxDomRef>) => {
        const el = event.currentTarget;
        const textInput = event.clipboardData.getData("text/plain");
        const texts = handlePastedText(textInput);
        const pickedTexts: Array<string> = [];

        if (texts.length) {
          event.preventDefault();
          event.stopPropagation();

          if (!items?.length) {
            return;
          }

          const results = texts
            .map((t) => ({
              text: t,
              item: items.find(
                (item, index) =>
                  t === String(retrieveItemValue(item)) ||
                  t === retrieveItemLabel(item)
              ),
            }))
            .filter((res) => res.item != null)
            .filter(
              (res) =>
                !selectedValue ||
                !selectedValue.includes(
                  retrieveItemValue(res.item as MultiSelectItem)
                )
            );
          const pickedTexts = results.map((res) => res.text);
          const newValuesToSelect = results.map((res) =>
            retrieveItemValue(res.item as MultiSelectItem)
          );

          if (newValuesToSelect.length === 0) {
            return;
          }

          const allValues = [
            ...(selectedValue ? selectedValue : []),
            ...newValuesToSelect,
          ];
          const domItems = allValues
            .map((value) =>
              items.findIndex((item) => value === retrieveItemValue(item))
            )
            .map((index) => (el as any).items[index])
            .filter((index) => index != null);

          el.fireEvent<MultiComboBoxSelectionChangeEventDetail>(
            "selection-change",
            {
              items: domItems,
            }
          );

          const filteredText = texts.filter((t) => !pickedTexts.includes(t));
          setTimeout(() => {
            // @ts-ignore
            el.shadowRoot.activeElement.value = filteredText.join(" ");
            el.value = filteredText.join(" ");
          }, 50);
        }
      },
      [
        items,
        setSelectedValue,
        selectedValue,
        retrieveItemValue,
        retrieveItemLabel,
      ]
    );

    // NOTE: onChange is bound to input instead of items, that's why can't use it
    return (
      <>
        <MultiComboBox
          {...otherProps}
          ref={internalRef}
          onSelectionChange={handleSelectionChange}
          onOpenChange={handleOpenChange}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          onPaste={onPaste}
        >
          {items.map((item, index) => (
            // index is the most unique value, value could be non-unique when providing numbers and strings (react keys are strings)
            <MultiComboBoxItem
              key={index}
              text={retrieveItemLabel(item) as string}
              data-index={index}
              selected={
                Array.isArray(selectedValue) &&
                selectedValue.includes(retrieveItemValue(item))
              }
            />
          ))}
        </MultiComboBox>
      </>
    );
  }
) as <Item = MultiSelectItem, Value = string | number>(
  p: MultiSelectProps<Item, Value> & {
    ref?: Ref<MultiComboBoxDomRef | undefined>;
  }
) => ReactElement;
