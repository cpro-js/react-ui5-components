import {
  MultiComboBox,
  MultiComboBoxDomRef,
  MultiComboBoxItem,
  MultiComboBoxPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { MultiComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/MultiComboBox.js";
import {
  ClipboardEvent,
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
import { GlobalHtmlKeyInputElementProps } from "./GlobalHtmlElementProps";
import { useAllowAction } from "./util";

export interface MultiSelectItem {
  value: string | number;
  label: string;
}

export type MultiSelectProps<
  Item = MultiSelectItem,
  Value = string | number
> = GlobalHtmlKeyInputElementProps<MultiComboBoxDomRef> &
  Pick<
    MultiComboBoxPropTypes,
    | "onChange"
    | "icon"
    | "onInput"
    | "onOpen"
    | "onClose"
    | "valueStateMessage"
    | "noValidation"
    | "disabled"
    | "filter"
    | "noTypeahead"
    | "placeholder"
    | "readonly"
    | "required"
    | "valueState"
  > & {
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
  };

const DEFAULT_LABEL_PROP = "label";
const DEFAULT_VALUE_PROP = "value";

/** `MultiSelect` as a wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-multicombobox--docs" target="_blank">UI5 MultiComboBox</a> adding
 * additional functionality and customization for handling multiple selections.
 */
export const MultiSelect = forwardRef<
  MultiComboBoxDomRef | null,
  MultiSelectProps
>((props, forwardedRef) => {
  const {
    name,
    items = [],
    onSelectionChange,
    onOpen,
    onClose,
    onKeyPress,
    value,
    itemValue,
    itemLabel,
    ...otherProps
  } = props;

  const internalRef = useRef<MultiComboBoxDomRef>(null);
  useImperativeHandle<MultiComboBoxDomRef | null, MultiComboBoxDomRef | null>(
    forwardedRef,
    () => internalRef.current,
    []
  );

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

  const [allowSubmitOnEnter, setAllowSubmitOnEnter] = useAllowAction(true);
  const handleOnOpen = useCallback(
    (event: Ui5CustomEvent<MultiComboBoxDomRef>) => {
      setAllowSubmitOnEnter(false);

      if (onOpen != null) {
        onOpen(event);
      }
    },
    [setAllowSubmitOnEnter, onOpen]
  );

  const handleOnClose = useCallback(
    (event: Ui5CustomEvent<MultiComboBoxDomRef>) => {
      setAllowSubmitOnEnter(true);

      if (onClose != null) {
        onClose(event);
      }
    },
    [setAllowSubmitOnEnter, onClose]
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
        onOpen={handleOnOpen}
        onClose={handleOnClose}
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
}) as <Item = MultiSelectItem, Value = string | number>(
  p: MultiSelectProps<Item, Value> & {
    ref?: Ref<MultiComboBoxDomRef | undefined>;
  }
) => ReactElement;
