import {
  FieldPath,
  FieldPathValue,
  FieldPathValues,
  FieldValues,
  useWatch,
} from "react-hook-form";

export const useFormValue: {
  <
    TFieldValues extends FieldValues = {},
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(
    name: TFieldName
  ): FieldPathValue<TFieldValues, TFieldName>;
  <
    TFieldValues extends FieldValues = {},
    TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[]
  >(
    names: TFieldNames
  ): FieldPathValues<TFieldValues, TFieldNames>;
} = (name: any): any => {
  return useWatch({ name: name }); // subscribe to re-render
};
