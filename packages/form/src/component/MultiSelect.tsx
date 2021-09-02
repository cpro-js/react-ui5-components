import { MultiComboBox, MultiComboBoxItem } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { MultiComboBoxPropTypes } from "@ui5/webcomponents-react/webComponents/MultiComboBox";
import React, { FC, KeyboardEvent, forwardRef, useCallback } from "react";

import { triggerSubmitOnEnter, useAllowAction } from "./util";

export interface MultiSelectItem {
  value: string | number;
  label: string;
}

export interface MultiSelectProps
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
  onSelectionChange?: (
    event: Ui5CustomEvent<
      HTMLInputElement,
      {
        items: Array<HTMLElement>;
      }
    >,
    value: Array<string | number>
  ) => void;
}

export const MultiSelect: FC<MultiSelectProps> = forwardRef<
  HTMLInputElement | undefined,
  MultiSelectProps
>((props, forwardedRef) => {
  const {
    name,
    items = [],
    onSelectionChange,
    onOpenChange,
    onKeyDown,
    onKeyPress,
    value,
    ...otherProps
  } = props;

  const handleSelectionChange = useCallback(
    (
      event: Ui5CustomEvent<HTMLInputElement, { items: Array<HTMLElement> }>
    ) => {
      if (onSelectionChange != null) {
        const values: Array<string | number> = event.detail.items
          .map((el) => el.dataset.index)
          .filter((index) => index != null)
          .map((index) => items[Number(index)]?.value);

        onSelectionChange(event, values);
      }
    },
    [items, onSelectionChange]
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
    (event: Ui5CustomEvent<HTMLInputElement & { open: boolean }>) => {
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

  // NOTE: onChange is bound to input instead of items, that's why can't use it
  return (
    <>
      <MultiComboBox
        {...otherProps}
        ref={forwardedRef}
        onSelectionChange={
          handleSelectionChange as (
            event: Ui5CustomEvent<HTMLInputElement, { items: unknown[] }>
          ) => void
        }
        onOpenChange={
          handleOpenChange as (event: Ui5CustomEvent<HTMLInputElement>) => void
        }
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
      >
        {items.map((item, index) => (
          // index is the most unique value, value could be non-unique when providing numbers and strings (react keys are strings)
          <MultiComboBoxItem
            key={index}
            text={item.label}
            data-index={index}
            selected={Array.isArray(value) && value.indexOf(item.value) !== -1}
          />
        ))}
      </MultiComboBox>
    </>
  );
});
