import { ReactElement, Ref, forwardRef } from "react";

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

export type CreatableAutocompleteProps<TModel = DefaultAutoCompleteOption> =
  Omit<CoreAutocompleteProps<TModel>, UseItemModelManagedPropKeys> &
    UseItemAdditionalProps<TModel> &
    UseCreatableAdditionalProps<TModel>;

export const CreatableAutocomplete = forwardRef<
  HTMLInputElement,
  CreatableAutocompleteProps
>((props, forwardedRef) => {
  const itemModelProps = useItemModel<DefaultAutoCompleteOption, typeof props>(
    props
  );
  const stateProps = useInputState<
    DefaultAutoCompleteOption,
    typeof itemModelProps
  >(itemModelProps);
  const creatableProps = useCreatable<
    DefaultAutoCompleteOption,
    typeof stateProps
  >(stateProps);

  return <CoreAutocomplete ref={forwardedRef} {...creatableProps} />;
}) as <T = DefaultAutoCompleteOption>(
  p: CreatableAutocompleteProps<T> & { ref?: Ref<HTMLInputElement | undefined> }
) => ReactElement;
