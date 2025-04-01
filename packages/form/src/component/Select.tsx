import {
  ComboBox,
  ComboBoxDomRef,
  ComboBoxItem,
  ComboBoxPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import {
  FocusEvent,
  KeyboardEvent,
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useEventCallback } from "usehooks-ts";

import {
  TypedCustomEvent,
  useCustomEventDispatcher,
} from "../hook/useCustomEventDispatcher";
import { GlobalHtmlKeyInputElementProps } from "./GlobalHtmlElementProps";
import { useFireSubmit } from "./util";

export interface SelectItem {
  value: string | number;
  label: string;
}

export type SelectProps<
  Item = SelectItem,
  Value = string | number
> = GlobalHtmlKeyInputElementProps<ComboBoxDomRef> &
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
    /** Render an additional text for each item */
    itemAdditionalText?: keyof Item | ((value: Item) => string);
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
    /** Fired when the input operation has finished by pressing Enter, focusout or an item is selected. */
    onChange?: (
      event: TypedCustomEvent<ComboBoxDomRef, { value: Value | undefined }>
    ) => void;
    /** Fired when the input operation has finished by pressing Enter */
    onSubmit?: (
      event: TypedCustomEvent<ComboBoxDomRef, { value: Value | undefined }>
    ) => void;
  };

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
      onFocus,
      onKeyDown,
      onKeyUp,
      onChange,
      onSubmit,
      value,
      itemValue = "value",
      itemLabel = "label",
      itemAdditionalText,
      ...otherProps
    } = props;

    // store internal input ref and pass it back
    const elementRef = useRef<ComboBoxDomRef>(null);
    useImperativeHandle(forwardedRef, () => elementRef.current!, []);

    const retrieveItemLabel = useCallback(
      (item: SelectItem) => {
        if (typeof itemLabel === "function") {
          return itemLabel(item);
        }
        return item[itemLabel];
      },
      [itemLabel]
    );

    const retrieveItemValue = useCallback(
      (item: SelectItem) => {
        if (typeof itemValue === "function") {
          return itemValue(item);
        }
        return item[itemValue];
      },
      [itemValue]
    );

    const retrieveAdditionalText = useCallback(
      (item: SelectItem) => {
        if (typeof itemAdditionalText === "string") {
          return item[itemAdditionalText];
        } else if (typeof itemAdditionalText === "function") {
          return itemAdditionalText(item);
        }
        return undefined;
      },
      [itemAdditionalText]
    );

    const lastValue = useRef<typeof value>(value);
    const submit = useFireSubmit();

    const dispatchChangeEvent = useCustomEventDispatcher<
      ComboBoxDomRef,
      {
        value: typeof value;
      }
    >({
      ref: elementRef,
      name: "cpro-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      ComboBoxDomRef,
      {
        value: typeof value;
      }
    >({
      ref: elementRef,
      name: "cpro-submit",
      onEvent: onSubmit,
      delay: 0,
    });

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
          ref={elementRef}
          value={text}
          onFocus={useEventCallback((e) => {
            submit.focus();
            onFocus?.(e as FocusEvent<ComboBoxDomRef>);
          })}
          onKeyDown={useEventCallback((e) => {
            submit.keyDown(e);
            onKeyDown?.(e as KeyboardEvent<ComboBoxDomRef>);
          })}
          onKeyUp={useEventCallback(async (event) => {
            onKeyUp?.(event as KeyboardEvent<ComboBoxDomRef>);
            if (submit.shouldFireSubmitOnKeyUp()) {
              // no change fired before -> user just pressed enter again -> trigger submit
              dispatchSubmitEvent({
                value: lastValue.current,
              });
            }
          })}
          onSelectionChange={useEventCallback((event) => {
            if (onSelectionChange != null) {
              const index = event.detail.item.dataset.index;
              const selectedItem =
                index == null ? undefined : items[Number(index)];
              const value =
                selectedItem == null
                  ? undefined
                  : retrieveItemValue(selectedItem);
              onSelectionChange(event, value);
            }
          })}
          onChange={useEventCallback((event) => {
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
            const selectedItem =
              index == null ? undefined : items[Number(index)];
            const value =
              selectedItem == null
                ? undefined
                : retrieveItemValue(selectedItem);

            lastValue.current = value;
            dispatchChangeEvent({
              value,
            });

            if (submit.shouldFireSubmitOnChange()) {
              // change event was triggered by enter --> submit
              dispatchSubmitEvent({
                value,
              });
            }
          })}
        >
          {addEmptyOption && <ComboBoxItem text="---" />}
          {items.map((item, index) => (
            // index is the most unique value, value could be non-unique when providing numbers and strings (react keys are strings)
            <ComboBoxItem
              key={index}
              data-index={index}
              text={retrieveItemLabel(item) as string | undefined}
              additionalText={
                retrieveAdditionalText(item) as string | undefined
              }
            />
          ))}
        </ComboBox>
      </>
    );
  }
) as <Item = SelectItem, Value = string | number>(
  p: SelectProps<Item, Value> & { ref?: Ref<ComboBoxDomRef | undefined> }
) => ReactElement;
