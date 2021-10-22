import "./FormViewer.css";

import { FC } from "react";

import { Button } from "../component/Button";

interface FormViewerProps {
  getSubmittedValues: Function;
}

export const FormViewer: FC<FormViewerProps> = ({
  getSubmittedValues,
  ...props
}) => {
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <Button style={{ marginRight: "10px" }} type="submit">
          Submit
        </Button>
        <Button type="reset">Reset</Button>
      </div>
      <h2>Submitted Values</h2>
      {!Object.keys(getSubmittedValues()).length ? (
        <p>No submitted data yet!</p>
      ) : (
        <p>{JSON.stringify(getSubmittedValues(), null, "\t")}</p>
      )}
    </div>
  );
};
