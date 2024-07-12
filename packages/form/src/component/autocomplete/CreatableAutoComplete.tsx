import { InputDomRef } from "@ui5/webcomponents-react";
import { HTMLAttributes, ReactElement, Ref, forwardRef } from "react";

import {
  UseAsyncAdditionalProps,
  UseAsyncManagedPropKeys,
  useAsync,
} from "./hooks/useAsync";
import {
  UseCreatableAdditionalProps,
  useCreatable,
} from "./hooks/useCreatable";
import { useInputState } from "./hooks/useInputState";
import {
  UseItemAdditionalProps,
  UseItemModelManagedPropKeys,
  useItemModel,
} from "./hooks/useItemModel";
import {
  CoreAutocomplete,
  CoreAutocompleteProps,
  DefaultAutoCompleteOption,
} from "./internal/CoreAutocomplete";

// Define the SharedHtmlProps including a custom type for onKeyUp
type SharedHtmlProps = Pick<
  HTMLAttributes<HTMLElement>,
  | "style"
  | "className"
  | "id"
  | "placeholder"
  | "title"
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

export type CreatableAutoCompleteProps<TModel = DefaultAutoCompleteOption> =
  SharedHtmlProps &
    Omit<
      Pick<
        CoreAutocompleteProps<TModel>,
        | "name"
        | "value"
        | "itemProps"
        | "onInputChange"
        | "onValueChange"
        | "forceSelection"
        | "icon"
        | "valueStateMessage"
        | "onSuggestionItemPreview"
        | "onSuggestionItemSelect"
        | "disabled"
        | "maxlength"
        | "noTypeahead"
        | "placeholder"
        | "readonly"
        | "required"
        | "showClearIcon"
        | "valueState"
      >,
      "inputValue" | UseAsyncManagedPropKeys | UseItemModelManagedPropKeys
    > &
    UseAsyncAdditionalProps<TModel> &
    UseItemAdditionalProps<TModel> &
    UseCreatableAdditionalProps<TModel>;

export const CreatableAutoComplete = forwardRef<
  InputDomRef,
  CreatableAutoCompleteProps
>((props, forwardedRef) => {
  const itemModelProps = useItemModel<DefaultAutoCompleteOption, typeof props>(
    props
  );
  const asyncProps = useAsync<DefaultAutoCompleteOption, typeof itemModelProps>(
    itemModelProps
  );
  const stateProps = useInputState<
    DefaultAutoCompleteOption,
    typeof asyncProps
  >(asyncProps);
  const creatableProps = useCreatable<
    DefaultAutoCompleteOption,
    typeof stateProps
  >(stateProps);

  return <CoreAutocomplete ref={forwardedRef} {...creatableProps} />;
}) as <T = DefaultAutoCompleteOption>(
  p: CreatableAutoCompleteProps<T> & {
    ref?: Ref<HTMLInputElement | undefined>;
  }
) => ReactElement;
