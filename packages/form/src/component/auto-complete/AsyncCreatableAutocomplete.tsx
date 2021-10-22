import { ReactElement, Ref, forwardRef } from "react";
import { Simplify } from "type-fest";

import { DefaultAutoCompleteOption } from "../AutoCompleteModel";
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
} from "./internal/CoreAutocomplete";

export type AsyncCreatableAutocompleteProps<
  TModel = DefaultAutoCompleteOption
> = Simplify<
  Omit<
    CoreAutocompleteProps<TModel>,
    UseAsyncManagedPropKeys | UseItemModelManagedPropKeys
  > &
    UseAsyncAdditionalProps<TModel> &
    UseItemAdditionalProps<TModel> &
    UseCreatableAdditionalProps<TModel>
>;

export const AsyncCreatableAutocomplete = forwardRef<
  HTMLInputElement,
  AsyncCreatableAutocompleteProps
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
  p: AsyncCreatableAutocompleteProps<T> & {
    ref?: Ref<HTMLInputElement | undefined>;
  }
) => ReactElement;
