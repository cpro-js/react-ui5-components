import { Text, Title, Toolbar } from "@ui5/webcomponents-react";
import { FC, useCallback, useState } from "react";

import { Button } from "../component/Button";
import { FormSubmitHandler } from "./types";

export interface useFormViewerProps<FormValues extends {}> {
  onSubmit: FormSubmitHandler<FormValues>;
}
export interface FormViewerProps<T> {
  submittedValues?: T | undefined;
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
  ...props
}: FormViewerProps<T>) {
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <Button style={{ marginRight: "10px" }} type="submit">
          Submit
        </Button>
        <Button type="reset">Reset</Button>
      </div>
      <Toolbar>
        <Title> Submitted Values </Title>
      </Toolbar>
      <div style={{ marginTop: "10px" }}>
        {submittedValues == null ? (
          <Text> No submitted data yet!</Text>
        ) : (
          <Text renderWhitespace>
            {JSON.stringify(submittedValues, null, 2)}{" "}
          </Text>
        )}
      </div>
    </div>
  );
}
