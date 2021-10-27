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

export type CreatableSelectProps<TModel = DefaultAutoCompleteOption> = Omit<
  CoreAutocompleteProps<TModel>,
  UseItemModelManagedPropKeys | "inputValue"
> &
  UseItemAdditionalProps<TModel> &
  UseCreatableAdditionalProps<TModel>;

export const CreatableSelect = forwardRef<
  HTMLInputElement,
  CreatableSelectProps
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
  p: CreatableSelectProps<T> & { ref?: Ref<HTMLInputElement | undefined> }
) => ReactElement;
