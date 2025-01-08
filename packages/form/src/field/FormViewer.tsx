import { Text, Title, Toolbar } from "@ui5/webcomponents-react";
import { MutableRefObject, RefObject, useCallback, useState } from "react";

import { Button } from "../component/Button";
import { FormFieldElement, FormSubmitHandler } from "./types";

export interface useFormViewerProps<FormValues extends {}> {
  onSubmit: FormSubmitHandler<FormValues>;
}

export interface FormViewerProps<T> {
  submittedValues?: T | undefined;
  fieldRef?:
    | MutableRefObject<FormFieldElement | undefined>
    | RefObject<FormFieldElement | undefined>;
}

export function useFormViewer<FormValues extends {}>(
  props: useFormViewerProps<FormValues>
) {
  const { onSubmit: onSubmitAction } = props;
  const [submittedValues, setSubmittedValues] = useState<FormValues>();

  const handleSubmit: FormSubmitHandler<FormValues> = useCallback(
    (values, actions) => {
      setSubmittedValues(values);
      onSubmitAction(values, actions);
    },
    [setSubmittedValues, onSubmitAction]
  );

  return { submittedValues, handleSubmit };
}

export function FormViewer<T>({
  submittedValues,
  fieldRef,
}: FormViewerProps<T>) {
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <Button style={{ marginRight: "10px" }} type="submit">
          Submit
        </Button>
        <Button style={{ marginRight: "10px" }} type="reset">
          Reset
        </Button>
        {fieldRef != null && (
          <Button onClick={() => fieldRef?.current?.focus()} type="button">
            Focus
          </Button>
        )}
      </div>
      <Title> Submitted Values </Title>
      <div style={{ marginTop: "10px" }}>
        {submittedValues == null ? (
          <Text>No submitted data yet!</Text>
        ) : (
          <Text style={{ whiteSpace: "pre" }}>
            {JSON.stringify(submittedValues, null, 2)}{" "}
          </Text>
        )}
      </div>
    </div>
  );
}
