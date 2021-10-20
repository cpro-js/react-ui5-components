import { DefaultAutoCompleteOption } from "../AutoCompleteModel";
import { useAsync } from "./hooks/useAsync";
import { useInputState } from "./hooks/useInputState";
import { useItemModel } from "./hooks/useItemModel";
import {
  CoreAutocomplete,
  CoreAutocompleteProps,
} from "./internal/CoreAutocomplete";

export interface AsyncAutocompleteProps<TModel = DefaultAutoCompleteOption>
  extends CoreAutocompleteProps<TModel> {}

export const AsyncAutocomplete = (props: AsyncAutocompleteProps) => {
  const itemModelProps = useItemModel(props);

  const asyncProps = useAsync(itemModelProps);
  const stateProps = useInputState(asyncProps);

  return <CoreAutocomplete {...stateProps} />;
};
