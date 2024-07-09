import {
  ComboBox,
  ComboBoxDomRef,
  ComboBoxItem,
  ComboBoxPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import {
  HTMLAttributes,
  KeyboardEvent,
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
} from "react";

import { triggerSubmitOnEnter } from "./util";

export interface SelectItem {
  value: string | number;
  label: string;
}

// pick only those props which we do care about
type SharedHtmlProps = Pick<
  HTMLAttributes<HTMLElement>,
  | "style"
  | "className"
  | "id"
  | "placeholder"
  | "title"
  | "onKeyUp"
  | "onKeyDown"
  | "onBlur"
  | "onFocus"
  | "onPaste"
  | "onMouseOver"
  | "onMouseOut"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
>;

export type SelectProps<
  Item = SelectItem,
  Value = string | number
> = SharedHtmlProps &
  Pick<
    ComboBoxPropTypes,
    | "icon"
    | "onInput"
    | "valueStateMessage"
    | "disabled"
    | "filter"
    | "loading"
    | "noTypeahead"
    | "placeholder"
    | "readonly"
    | "required"
    | "valueState"
    | "onKeyPress"
  > & {
    /** Name of the component */
    name?: string;
    /** Defines the value of the component.
     * The property is updated upon selecting.
     */
    value?: Value;
    /** Defines the items that can be selected in the component */
    items?: Array<Item>;
    /** Determines whether an empty option should be added. */
    addEmptyOption?: boolean;
    /** Defines how to extract the value from each Item */
    itemValue?: keyof Item | ((value: Item) => Value);
    /** Defines how to extract the label from each Item */
    itemLabel?: keyof Item | ((value: Item) => string);
    /** Event handler triggered when selecting an Item in the dropdown menu*/
    onSelectionChange?: (
      event: Ui5CustomEvent<
        ComboBoxDomRef,
        {
          item: HTMLElement;
        }
      >,
      value?: Value
    ) => void;
    /** Event handler triggered when Item in component changes */
    onChange?: (event: Ui5CustomEvent<ComboBoxDomRef>, value?: Value) => void;
  };
/* 
export interface SelectProps<Item = SelectItem, Value = string | number>
  extends Omit<
    ComboBoxPropTypes,
    | "name"
    | "value"
    | "filterValue"
    | "children"
    | "onSelectionChange"
    | "onChange"
  > {
  /** Name of the component */
//name?: string;
/** Defines the value of the component.
 * The property is updated upon selecting.
 */
//value?: Value;
/** Defines the items that can be selected in the component */
//items?: Array<Item>;
/** Determines whether an empty option should be added. */
//addEmptyOption?: boolean;
/** Defines how to extract the value from each Item */
//itemValue?: keyof Item | ((value: Item) => Value);
/** Defines how to extract the label from each Item */
//itemLabel?: keyof Item | ((value: Item) => string);
/** Event handler triggered when selecting an Item in the dropdown menu*/
//onSelectionChange?: (
// event: Ui5CustomEvent<
// ComboBoxDomRef,
//{
//  item: HTMLElement;
//}
// >,
//value?: Value
//) => void;
/** Event handler triggered when Item in component changes */
//onChange?: (event: Ui5CustomEvent<ComboBoxDomRef>, value?: Value) => void;
//} */

const DEFAULT_LABEL_PROP = "label";
const DEFAULT_VALUE_PROP = "value";

/** `Select` as a wrapper for
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-combobox--docs" target="_blank">UI5 ComboBox</a>
 *  providing additional functionality for creating a select/dropdown component.
 */
export const Select = forwardRef<ComboBoxDomRef, SelectProps>(
  (props, forwardedRef) => {
    const {
      name,
      items = [],
      addEmptyOption,
      onSelectionChange,
      onChange,
      onKeyDown,
      onKeyPress,
      value,
      itemValue,
      itemLabel,
      ...otherProps
    } = props;

    const retrieveItemLabel = useCallback(
      (item: SelectItem) => {
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
      (item: SelectItem) => {
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
      (event: Ui5CustomEvent<ComboBoxDomRef, { item: any }>) => {
        if (onSelectionChange != null) {
          const index = event.detail.item.dataset.index;
          const selectedItem = index == null ? undefined : items[Number(index)];
          const value =
            selectedItem == null ? undefined : retrieveItemValue(selectedItem);
          onSelectionChange(event, value);
        }
      },
      [items, onSelectionChange, retrieveItemValue]
    );

    const handleChange = useCallback(
      (event: Ui5CustomEvent<ComboBoxDomRef>) => {
        if (onChange != null) {
          // determine selected item
          const item =
            // first attempt: prefer item which matches our text and is selected -> best one
            (
              Array.from(event.target.childNodes) as Array<HTMLOptionElement>
            ).find(
              (item) => item.text === event.target.value && item.selected
            ) ??
            // nothing found -> selected property might be incorrect or delayed
            // fallback: just find an item with the same text
            (
              Array.from(event.target.childNodes) as Array<HTMLOptionElement>
            ).find((item) => item.text === event.target.value);

          const index = item?.dataset.index;
          const selectedItem = index == null ? undefined : items[Number(index)];
          const value =
            selectedItem == null ? undefined : retrieveItemValue(selectedItem);

          onChange(event, value);
        }
      },
      [items, onChange, retrieveItemValue]
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

    const handleKeyPress = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        // Workaround: Webcomponents catches enter -> need to submit manually
        // see https://github.com/SAP/ui5-webcomponents/pull/2855/files
        triggerSubmitOnEnter(event);
        if (onKeyPress != null) {
          onKeyPress(event);
        }
      },
      [onKeyPress]
    );

    const selectedItem = items.find(
      (item) => retrieveItemValue(item) === value
    );
    const text = String(
      selectedItem != null ? retrieveItemLabel(selectedItem) ?? "" : ""
    );

    return (
      <>
        <ComboBox
          {...otherProps}
          ref={forwardedRef}
          value={text}
          onSelectionChange={handleSelectionChange}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
        >
          {addEmptyOption && <ComboBoxItem text="---" />}
          {items.map((item, index) => (
            // index is the most unique value, value could be non-unique when providing numbers and strings (react keys are strings)
            <ComboBoxItem
              key={index}
              text={retrieveItemLabel(item) as string}
              data-index={index}
            />
          ))}
        </ComboBox>
      </>
    );
  }
) as <Item = SelectItem, Value = string | number>(
  p: SelectProps<Item, Value> & { ref?: Ref<ComboBoxDomRef | undefined> }
) => ReactElement;
