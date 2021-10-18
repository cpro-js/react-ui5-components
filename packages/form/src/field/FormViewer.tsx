import "./FormViewer.css";

import { FC, FormEventHandler, ReactElement, useState } from "react";
import { DefaultValues } from "react-hook-form";

import { Button } from "../component/Button";
import { FormController } from "../FormController";
import { FormValues } from "./FormValues";

interface FormViewerProps<FormValues extends {}> {
  component?: ReactElement;
  onSubmitAction?: FormEventHandler;
  initialValues?: DefaultValues<FormValues>;
  storyName?: string;
}

export const FormViewer: FC<FormViewerProps<typeof FormValues>> = ({
  component,
  onSubmitAction,
  initialValues,
  storyName,
  ...props
}) => {
  const storyNameSubmittedValues = `${storyName}_submittedValues`;

  const [submittedValues, setSubmittedValues] = useState(
    storyNameSubmittedValues
  );

  const onSubmit = (values: FormData) => {
    // @ts-ignore
    setSubmittedValues(values);
    // @ts-ignore
    onSubmitAction(values);
  };

  return (
    <div>
      <FormController<FormData> {...{ initialValues, onSubmit }}>
        <> {component} </>

        <div style={{ marginTop: "10px" }}>
          <Button style={{ marginRight: "10px" }} type="submit">
            Submit
          </Button>
          <Button type="reset">Reset</Button>
        </div>
        <h2>Submitted Values</h2>
        {submittedValues == storyNameSubmittedValues ? (
          <p>No submitted data yet!</p>
        ) : (
          <p>{JSON.stringify(submittedValues)}</p>
        )}
      </FormController>
    </div>
  );
};
