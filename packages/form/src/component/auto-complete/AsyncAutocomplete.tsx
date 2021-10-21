import { Simplify } from "type-fest";

import { DefaultAutoCompleteOption } from "../AutoCompleteModel";
import {
  UseAsyncAdditionalProps,
  UseAsyncManagedPropKeys,
  useAsync,
} from "./hooks/useAsync";
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

export type AsyncAutocompleteProps<TModel = DefaultAutoCompleteOption> =
  Simplify<
    Omit<
      CoreAutocompleteProps<TModel>,
      UseAsyncManagedPropKeys | UseItemModelManagedPropKeys
    > &
      UseAsyncAdditionalProps<TModel> &
      UseItemAdditionalProps<TModel>
  >;

export const AsyncAutocomplete = (props: AsyncAutocompleteProps) => {
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

  return <CoreAutocomplete {...stateProps} />;
};
