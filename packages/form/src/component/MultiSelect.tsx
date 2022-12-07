import {
  MultiComboBox,
  MultiComboBoxDomRef,
  MultiComboBoxItem,
  MultiComboBoxPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import {
  ClipboardEvent,
  KeyboardEvent,
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

export interface MultiSelectProps<T = MultiSelectItem>
  extends Omit<
    MultiComboBoxPropTypes,
    | "name"
    | "value"
    | "filterValue"
    | "children"
    | "onSelectionChange"
    | "onChange"
  > {
  name?: string;
  value?: Array<string | number>;
  items?: Array<MultiSelectItem>;
  itemValue?: keyof T | ((value: T) => string);
  itemLabel?: keyof T | ((value: T) => string);
  onSelectionChange?: (
    event: Ui5CustomEvent<
      MultiComboBoxDomRef,
      {
        items: Array<HTMLElement>;
      }
    >,
    value: Array<string | number>
  ) => void;
}

const DEFAULT_LABEL_PROP = "label";
const DEFAULT_VALUE_PROP = "value";

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

    const internalRef = useRef<MultiComboBoxDomRef | null>(null);
    // @ts-ignore
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
          { items: Array<HTMLElement> }
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
      (event: ClipboardEvent<HTMLElement>) => {
        const textInput = event.clipboardData.getData("text/plain");
        const texts = handlePastedText(textInput);
        const pickedTexts: Array<string> = [];

        if (texts.length) {
          event.preventDefault();
          event.stopPropagation();

          if (!items?.length) {
            return;
          }
          const selected = texts
            .map((t) =>
              items.find((item) => {
                const result = t === String(item.value) || t === item.label;
                if (result) {
                  pickedTexts.push(t);
                }
                return result;
              })
            )
            .filter((item): item is MultiSelectItem => !!item)
            .map((item) => String(item.value))
            .filter(
              (itemValue) =>
                !selectedValue || !selectedValue.includes(itemValue)
            );

          if (selected.length) {
            setSelectedValue([
              ...(selectedValue ? selectedValue : []),
              ...selected,
            ]);
          }

          const filteredText = texts.filter((t) => !pickedTexts.includes(t));
          setTimeout(
            () =>
              // @ts-ignore
              (event.target.shadowRoot.activeElement.value =
                filteredText.join(" ")),
            50
          );
        }
      },
      [items, setSelectedValue, selectedValue]
    );

    // NOTE: onChange is bound to input instead of items, that's why can't use it
    return (
      <>
        <MultiComboBox
          {...otherProps}
          ref={forwardedRef}
          onSelectionChange={
            handleSelectionChange as (
              event: Ui5CustomEvent<MultiComboBoxDomRef, { items: unknown[] }>
            ) => void
          }
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
                selectedValue.includes(item.value)
              }
            />
          ))}
        </MultiComboBox>
      </>
    );
  }
) as <T = MultiSelectItem>(
  p: MultiSelectProps<T> & { ref?: Ref<MultiComboBoxDomRef | undefined> }
) => ReactElement;
